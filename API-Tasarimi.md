openapi: 3.0.3
info:
  title: Fractal Trader Pro API
  description: |
    Finansal Karar Destek Sistemi için RESTful API.
    
    ## Özellikler
    - Kullanıcı hesap yönetimi
    - Zaman Aynası algoritması ile fiyat analizi
    - Geçmiş analiz sonuçlarının saklanması ve yönetimi
    - JWT tabanlı kimlik doğrulama
  version: 1.0.0
  contact:
    name: Enes Paçalar
    email: enespacalar@yazmuh.com
  license:
    name: MIT

servers:
  - url: http://localhost:8000/api/v1
    description: Development server

tags:
  - name: users
    description: Kullanıcı yönetimi işlemleri
  - name: analysis
    description: Finansal analiz ve simülasyon işlemleri

paths:
  /users/register:
    post:
      tags:
        - users
      summary: Yeni kullanıcı kaydı
      description: Sisteme yeni bir kullanıcı kaydeder
      operationId: registerUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserAuth'
      responses:
        '201':
          description: Kullanıcı başarıyla oluşturuldu
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/BadRequest'

  /users/login:
    post:
      tags:
        - users
      summary: Kullanıcı girişi
      description: Kullanıcı adı ve şifre ile giriş yapar
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserAuth'
      responses:
        '200':
          description: Giriş başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthToken'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /users/profile:
    get:
      tags:
        - users
      summary: Profil görüntüleme
      description: Giriş yapmış kullanıcının kendi profil bilgilerini getirir
      operationId: getUserProfile
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /users/password:
    put:
      tags:
        - users
      summary: Şifre güncelleme
      description: Kullanıcının mevcut şifresini değiştirir
      operationId: updatePassword
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PasswordUpdate'
      responses:
        '200':
          description: Şifre başarıyla güncellendi
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /users/account:
    delete:
      tags:
        - users
      summary: Hesap silme
      description: Kullanıcının hesabını sistemden tamamen siler
      operationId: deleteAccount
      security:
        - bearerAuth: []
      responses:
        '204':
          description: Hesap başarıyla silindi
        '401':
          $ref: '#/components/responses/Unauthorized'

  /analysis/start:
    post:
      tags:
        - analysis
      summary: Yeni analiz başlat
      description: Seçilen sembol için algoritmayı çalıştırır ve sonucu kaydeder
      operationId: startAnalysis
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AnalysisRequest'
      responses:
        '201':
          description: Analiz başarıyla tamamlandı ve kaydedildi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AnalysisResult'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /analysis/list:
    get:
      tags:
        - analysis
      summary: Analiz geçmişini listele
      description: Kullanıcının daha önce yaptığı analizleri listeler
      operationId: listAnalysis
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/AnalysisResult'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /analysis/detail/{analysisId}:
    get:
      tags:
        - analysis
      summary: Analiz detayı görüntüle
      description: Belirli bir analizin tüm detaylarını getirir
      operationId: getAnalysisDetail
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/AnalysisIdParam'
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AnalysisResult'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

  /analysis/note/{analysisId}:
    put:
      tags:
        - analysis
      summary: Analize not ekle
      description: Kayıtlı bir analize kişisel not ekler veya günceller
      operationId: updateAnalysisNote
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/AnalysisIdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NoteUpdate'
      responses:
        '200':
          description: Not başarıyla güncellendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AnalysisResult'
        '404':
          $ref: '#/components/responses/NotFound'

  /analysis/remove/{analysisId}:
    delete:
      tags:
        - analysis
      summary: Analiz kaydını sil
      description: İlgili analiz kaydını sistemden siler
      operationId: deleteAnalysis
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/AnalysisIdParam'
      responses:
        '204':
          description: Analiz başarıyla silindi
        '404':
          $ref: '#/components/responses/NotFound'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT token ile kimlik doğrulama

  parameters:
    AnalysisIdParam:
      name: analysisId
      in: path
      required: true
      description: Analiz ID'si
      schema:
        type: integer
        example: 1

  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          example: 1
        username:
          type: string
          example: "enespacalar"
        createdAt:
          type: string
          format: date-time

    UserAuth:
      type: object
      required:
        - username
        - password
      properties:
        username:
          type: string
          example: "enespacalar"
        password:
          type: string
          format: password
          example: "Sifre123!"

    PasswordUpdate:
      type: object
      required:
        - old_password
        - new_password
      properties:
        old_password:
          type: string
          format: password
        new_password:
          type: string
          format: password

    AuthToken:
      type: object
      properties:
        token:
          type: string
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        user:
          $ref: '#/components/schemas/User'

    AnalysisRequest:
      type: object
      required:
        - symbol
        - window_size
      properties:
        symbol:
          type: string
          example: "BTC-USD"
        window_size:
          type: integer
          example: 30

    AnalysisResult:
      type: object
      properties:
        id:
          type: integer
          example: 1
        symbol:
          type: string
          example: "BTC-USD"
        predicted_peak:
          type: number
          format: float
          example: 71450.00
        predicted_dip:
          type: number
          format: float
          example: 63200.00
        similarity_score:
          type: number
          format: float
          example: 0.92
        user_note:
          type: string
          example: "Bu seviye kırılırsa takip edilecek."
        created_at:
          type: string
          format: date-time

    NoteUpdate:
      type: object
      required:
        - note
      properties:
        note:
          type: string
          example: "Bu seviye kırılırsa takip edilecek."

    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string

  responses:
    BadRequest:
      description: Geçersiz istek
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: "BAD_REQUEST"
            message: "İstek parametreleri geçersiz"
    
    Unauthorized:
      description: Yetkisiz erişim
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: "UNAUTHORIZED"
            message: "Kimlik doğrulama başarısız"
    
    NotFound:
      description: Kaynak bulunamadı
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: "NOT_FOUND"
            message: "İstenen kaynak bulunamadı"