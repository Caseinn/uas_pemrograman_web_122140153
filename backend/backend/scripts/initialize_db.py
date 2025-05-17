import transaction
import bcrypt
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config
from sqlalchemy.exc import IntegrityError
from ..models import get_tm_session, get_session_factory
from ..models.recipe import Recipe
from ..models.user import User
from ..models.comment import Comment

def main():
    config_uri = 'development.ini'
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')

    session_factory = get_session_factory(engine)

    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)

        # Cek apakah user sudah ada, hindari duplikasi
        existing_user = dbsession.query(User).filter_by(email='budi@example.com').first()
        if not existing_user:
            user1 = User(
                username='budi',
                email='budi@example.com',
                password=bcrypt.hashpw('budi1234'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='user'
            )
            dbsession.add(user1)
        else:
            user1 = existing_user

        existing_admin = dbsession.query(User).filter_by(email='chef@example.com').first()
        if not existing_admin:
            admin = User(
                username='chef',
                email='chef@example.com',
                password=bcrypt.hashpw('chef1234'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='admin'
            )
            dbsession.add(admin)

        dbsession.flush()

        # Tambahkan resep jika belum ada
        existing_recipe = dbsession.query(Recipe).filter_by(title='Nasi Goreng Spesial').first()
        if not existing_recipe:
            recipe1 = Recipe(
                title='Nasi Goreng Spesial',
                description='Nasi goreng ala restoran dengan telur dan daging ayam.',
                ingredients='2 porsi nasi putih\n1 butir telur\n100 gr daging ayam suwir\n2 siung bawang putih\n3 buah cabai merah\n1 batang daun bawang\n1 sdm kecap manis\nGaram dan merica secukupnya',
                steps='1. Tumis bawang putih dan cabai hingga harum.\n2. Masukkan telur, orak-arik sebentar.\n3. Tambahkan daging ayam dan nasi putih.\n4. Tuang kecap manis, aduk rata.\n5. Tambahkan daun bawang, garam, dan merica.\n6. Masak hingga matang.',
            )
            dbsession.add(recipe1)
            dbsession.flush()
        else:
            recipe1 = existing_recipe

        # Tambahkan komentar jika belum ada
        existing_comment = dbsession.query(Comment).filter_by(
            user_id=user1.id,
            recipe_id=recipe1.id
        ).first()

        if not existing_comment:
            comment1 = Comment(
                user_id=user1.id,
                recipe_id=recipe1.id,
                comment_text='Enak sekali! Keluargaku menyukainya.'
            )
            dbsession.add(comment1)

if __name__ == '__main__':
    main()
