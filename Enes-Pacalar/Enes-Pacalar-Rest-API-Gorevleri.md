# Enes Paçalar - REST API Görevleri
# **3. Aşama (REST API) Test Videom:** [Videoyu İzlemek İçin Tıklayın]
# https://youtu.be/7rBEMogp2TY
# **API Domain Adresi:** https://fractal-trader-api.onrender.com



**Proje:** Fractal Trader Pro
**Sorumlu:** Enes Paçalar

Bu projede "Fractal Trader Pro" backend sisteminin tüm REST API uç noktalarının (endpoints) geliştirilmesi, veritabanı (SQLite) bağlantılarının kurulması ve iş mantığı (business logic) kodlamaları bireysel olarak üstlenilmiştir. 

Aşağıdaki tablolarda geliştirilecek olan API servisleri, HTTP metodları ve üstlenilen görev detayları yer almaktadır:

## 1. Kullanıcı Yönetimi (User Management) API Görevleri

| Endpoint | Metod | CRUD İşlemi | Görev Açıklaması |
| :--- | :--- | :--- | :--- |
| `/api/v1/users/register` | POST | Create | Yeni kullanıcı kayıt algoritmasının yazılması ve veritabanı kaydı. |
| `/api/v1/users/login` | POST | Read / Auth | Kullanıcı şifre kontrolü ve kimlik doğrulama işlemlerinin yazılması. |
| `/api/v1/users/profile` | GET | Read | Giriş yapan kullanıcının kendi verilerini DB'den çekecek sorgunun yazılması. |
| `/api/v1/users/password` | PUT | Update | Veritabanındaki şifre alanının güncellenmesi işleminin kodlanması. |
| `/api/v1/users/account` | DELETE | Delete | Kullanıcı kaydının veritabanından kalıcı olarak silinmesi. |

## 2. Analiz ve Simülasyon (Core Engine) API Görevleri

| Endpoint | Metod | CRUD İşlemi | Görev Açıklaması |
| :--- | :--- | :--- | :--- |
| `/api/v1/analysis/start` | POST | Create | Zaman aynası (Fractal) algoritmasının tetiklenmesi ve sonucun DB'ye yazılması. |
| `/api/v1/analysis/list` | GET | Read | Kullanıcının geçmiş analiz sonuçlarını getirecek SQL sorgusunun yazılması. |
| `/api/v1/analysis/detail/{id}` | GET | Read | ID parametresine göre spesifik analizin detaylarının DB'den çekilmesi. |
| `/api/v1/analysis/note/{id}` | PUT | Update | Analiz tablosundaki not alanının (user_note) güncellenmesinin kodlanması. |
| `/api/v1/analysis/remove/{id}` | DELETE | Delete | İlgili analiz kaydının id'ye göre tespit edilip veritabanından silinmesi. |
