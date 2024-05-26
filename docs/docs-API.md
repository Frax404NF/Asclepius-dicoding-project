# Dokumentasi API Predict Asclepius

**Endpoint API:** http://0.0.0.0:3000/predict

**Metode:** POST

**Content-Type**: multipart/form-data

**Deskripsi:** Endpoint API ini digunakan untuk memprediksi data menggunakan model pembelajaran mesin.

**Autentikasi:** Tidak ada detail autentikasi yang disediakan.

**Body Permintaan:**

* **Format:** Form-data
* **Bidang yang Diperlukan:**
    * **image:** File gambar yang akan digunakan untuk prediksi. (Tipe Data: byte[])

# Respon pertama: Valid Prediction

**Endpoint API:** http://0.0.0.0:3000/predict

**Metode:** POST
* **Kode Status:**
    * 201: Dibuat - Prediksi berhasil.
* **Tipe Konten:** application/json
* **Body Respon:**

```json
{
  "status": "",  (String) Status prediksi (misalnya, sukses, gagal)
  "message": "", (String) Pesan tentang prediksi
  "data": {
    "id": "",       (String) Pengidentifikasi unik untuk prediksi
    "result": "",    (String) Hasil prediksi
    "suggestion": "",(String) Saran tindakan berdasarkan prediksi
    "createdAt": ""  (String) Tanggal dan waktu prediksi (format ISO8601)
  }
}
```

**Contoh Respon cancer:**
```json
{
  "status": "success",
  "message": "Model diprediksi dengan sukses",
  "data": {
    "id": "bcf86d03-5052-4bb8-b0af-901380f9e863",
    "result": "Kanker",
    "suggestion": "Segera periksa ke dokter!, Penting untuk melakukan pemeriksaan lebih lanjut untuk memastikan diagnosis",
    "createdAt": "2024-05-26T06:56:39.038Z"
  }
}
```

**Contoh Respon non-cancer:**
```json
{
    "status": "success",
    "message": "Model is predicted successfully",
    "data": {
        "id": "f897ad37-ebbc-4c5b-86e7-f9cf41e8e3a5",
        "result": "Non-cancer",
        "suggestion": "Anda sehat! Tetap jaga pola hidup sehat untuk menjaga kesehatan Anda",
        "createdAt": "2024-05-26T10:36:37.441Z"
    }
}
```

# Respon kedua: Prediction With Bad Request

**Endpoint API:** http://0.0.0.0:3000/predict

**Metode:** POST

* **Kode Status:**
    * 400: Bad Request - Terjadi kesalahan dalam melakukan prediksi
* **Tipe Konten:** application/json

* **Contoh kasus** : User memasukkan image yang tidak sesuai kriteria (image lain selain image kulit)

* **Respon:**
```json
{
    "status": "fail",
    "message": "Terjadi kesalahan dalam melakukan prediksi"
}
```

# Respon Ketiga: Prediction With Image Size More Than 1000000 byte
**Endpoint API:** http://0.0.0.0:3000/predict

**Metode:** POST

* **Kode Status:**
    * 413: Payload Too Large - Payload content length greater than maximum allowed: 1000000
* **Tipe Konten:** application/json

* **Contoh kasus** : User memasukkan image yang lebih dari ukuran maksimal 1MB (1000000 byte)

* **Respon:**
```json
{
    "status": "fail",
    "message": "Payload content length greater than maximum allowed: 1000000"
}
```

# Optional Get Histories

**Endpoint API:** http://0.0.0.0:3000/predict/histories

**Metode:** GET

**Content-Type**: multipart/form-data

**Deskripsi:** Endpoint API ini digunakan untuk menampilkan riwayat hasil prediksi yang dilakukan pengguna

* **Respon:**

```json

{
    "status": "success",
    "data": [
        {
            "id": "188755d0-1b17-411f-926e-afa2fe89c8c4",
            "history": {
                "result": "Cancer",
                "createdAt": "2024-05-26T07:12:11.632Z",
                "suggestion": "Segera periksa ke dokter! Penting untuk melakukan pemeriksaan lebih lanjut untuk memastikan diagnosis",
                "id": "188755d0-1b17-411f-926e-afa2fe89c8c4"
            }
        },
        {
            "id": "3ca946d8-4906-498c-8c77-b257ceb750ca",
            "history": {
                "result": "Non-cancer",
                "createdAt": "2024-05-26T07:12:40.722Z",
                "suggestion": "Anda sehat! Tetap jaga pola hidup sehat untuk menjaga kesehatan Anda",
                "id": "3ca946d8-4906-498c-8c77-b257ceb750ca"
            }
        },
    ]
}
```