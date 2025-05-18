import transaction
import bcrypt
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config
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

        # Tambahkan user biasa
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

        # Tambahkan admin
        existing_admin = dbsession.query(User).filter_by(email='admin@example.com').first()
        if not existing_admin:
            admin = User(
                username='admin',
                email='admin@example.com',
                password=bcrypt.hashpw('admin1234'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                role='admin'
            )
            dbsession.add(admin)

        dbsession.flush()

        # Daftar 10 resep khas Indonesia
        recipes_data = [
            {
                "title": "Rendang",
                "description": "Rendang daging sapi khas Minangkabau dengan santan dan rempah-rempah.",
                "ingredients": "1 kg daging sapi\n1 liter santan\n5 siung bawang putih\n10 butir bawang merah\n5 buah cabai merah\n2 batang serai\n2 lembar daun jeruk\n1 lembar daun kunyit\nGaram secukupnya",
                "steps": "1. Haluskan bumbu, tumis hingga harum.\n2. Masukkan santan dan bumbu ke dalam wajan.\n3. Tambahkan daging dan masak dengan api kecil.\n4. Aduk perlahan hingga mengering dan bumbu meresap.",
                "image": "https://www.frisianflag.com/storage/app/media/uploaded-files/rendang-padang.jpg"
            },
            {
                "title": "Sate Padang",
                "description": "Sate khas Padang dengan kuah kental berbumbu rempah.",
                "ingredients": "500 gr daging sapi\n10 tusuk sate\n3 siung bawang putih\n5 butir bawang merah\n2 sdm tepung beras\n2 lembar daun jeruk\n1 sdt kunyit\nAir, garam, dan rempah secukupnya",
                "steps": "1. Rebus daging hingga empuk, potong-potong.\n2. Buat kuah kental dari bumbu dan tepung beras.\n3. Tusuk daging, bakar, lalu siram kuah sate di atasnya.",
                "image": "https://asset.kompas.com/crops/hCbVquVhkYe2q3RO7e6CSH2XUH0=/0x0:1000x667/1200x800/data/photo/2021/03/28/60607a72127cd.jpg"
            },
            {
                "title": "Soto Padang",
                "description": "Soto khas Padang yang gurih dan disajikan dengan daging goreng serta kerupuk merah.",
                "ingredients": "300 gr daging sapi\n2 batang serai\n2 lembar daun salam\n4 siung bawang putih\n5 butir bawang merah\n1 sdt jahe, kunyit\nKerupuk merah, bihun, bawang goreng",
                "steps": "1. Rebus daging dengan bumbu hingga empuk.\n2. Goreng sebagian daging, sisihkan.\n3. Sajikan kuah dengan bihun, daging, dan pelengkap.",
                "image": "https://asset.kompas.com/crops/vD1UEEAUHHntyYjBaBGZ1VGfvF0=/0x0:1000x667/1200x800/data/photo/2020/10/15/5f87b001a1633.jpg"
            },
            {
                "title": "Ayam Goreng Lengkuas",
                "description": "Ayam goreng dengan bumbu lengkuas yang kaya rasa.",
                "ingredients": "1 ekor ayam\n5 siung bawang putih\n6 butir bawang merah\n2 ruas lengkuas parut\nGaram, ketumbar, air secukupnya",
                "steps": "1. Haluskan bumbu, rebus ayam hingga empuk.\n2. Goreng ayam dan bumbu lengkuas hingga garing.",
                "image": "https://asset.kompas.com/crops/NzEV5TayMdlh3_2RIRoncBFSmLs=/160x87:887x572/1200x800/data/photo/2023/06/06/647e93f68b845.jpg"
            },
            {
                "title": "Gado-Gado",
                "description": "Salad sayur dengan bumbu kacang khas Indonesia.",
                "ingredients": "Tauge, kol, kentang, telur, tahu, tempe, lontong\nKacang tanah, cabai, bawang putih, air jeruk, garam, gula merah",
                "steps": "1. Rebus semua sayuran dan bahan.\n2. Haluskan bumbu kacang dan siram di atas sayuran.",
                "image": "https://www.masakapahariini.com/wp-content/uploads/2019/01/gado-gado-MAHI.jpg"
            },
            {
                "title": "Pecel Lele",
                "description": "Lele goreng dengan sambal tomat dan lalapan.",
                "ingredients": "4 ekor lele\nMinyak untuk menggoreng\nCabai rawit, tomat, bawang merah, garam\nTimun, kemangi, kol",
                "steps": "1. Goreng lele hingga kering.\n2. Ulek sambal tomat.\n3. Sajikan dengan lalapan.",
                "image": "https://asset.kompas.com/crops/vhkkKrYsJtPGU9jIpuht1703nLs=/0x0:1000x667/1200x800/data/photo/2021/03/21/60569b33a2b3d.jpeg"
            },
            {
                "title": "Bakso Sapi",
                "description": "Bakso daging sapi kenyal dengan kuah kaldu.",
                "ingredients": "500 gr daging sapi cincang\n100 gr tepung tapioka\nBawang putih, merica, garam, es batu",
                "steps": "1. Campur semua bahan dan bentuk bola.\n2. Rebus hingga mengapung.\n3. Sajikan dengan kuah kaldu dan mie.",
                "image": "https://www.masakapahariini.com/wp-content/uploads/2018/04/resep_bakso_solo_MAHI.jpg"
            },
            {
                "title": "Nasi Uduk",
                "description": "Nasi gurih dimasak dengan santan dan rempah.",
                "ingredients": "2 cup beras\n200 ml santan\nSerai, daun salam, daun pandan, garam",
                "steps": "1. Campur semua bahan dan masak di rice cooker.\n2. Sajikan dengan telur dadar, ayam goreng, sambal.",
                "image": "https://asset.kompas.com/crops/cnjJ8a2_lEamvP1OkUClN1Oi0Dg=/100x67:900x600/1200x800/data/photo/2021/02/21/603203834f00f.jpg"
            },
            {
                "title": "Sayur Lodeh",
                "description": "Sayur bersantan dengan isian labu, terong, dan kacang panjang.",
                "ingredients": "Labu siam, terong, kacang panjang\nSantan, bawang merah, bawang putih, lengkuas, daun salam",
                "steps": "1. Tumis bumbu, masukkan sayuran.\n2. Tuang santan, masak hingga sayur empuk.",
                "image": "https://assets.unileversolutions.com/recipes-v2/230915.jpg"
            },
            {
                "title": "Tempe Orek",
                "description": "Tempe iris kecil dimasak manis pedas.",
                "ingredients": "1 papan tempe\nBawang merah, bawang putih, cabai merah, kecap manis, garam, gula",
                "steps": "1. Goreng tempe setengah kering.\n2. Tumis bumbu, masukkan tempe, aduk rata.",
                "image": "https://asset.kompas.com/crops/pfCFjT4X_UxjzxJqs0DgyIv770o=/0x0:780x520/1200x800/data/photo/2020/08/16/5f38219abbc58.jpg"
            },
        ]

        # Tambahkan semua resep di atas jika belum ada
        for data in recipes_data:
            existing = dbsession.query(Recipe).filter_by(title=data['title']).first()
            if not existing:
                new_recipe = Recipe(**data)
                dbsession.add(new_recipe)

if __name__ == '__main__':
    main()
