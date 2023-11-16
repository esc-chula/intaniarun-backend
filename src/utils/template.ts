import { $Enums, User } from "@prisma/client"

const bloodTypetoString = (bloodType: $Enums.BloodType) => {
    switch (bloodType) {
        case "A_PLUS":
            return "A+"
        case "A_MINUS":
            return "A-"
        case "B_PLUS":
            return "B+"
        case "B_MINUS":
            return "B-"
        case "O_PLUS":
            return "O+"
        case "O_MINUS":
            return "O-"
        case "AB_PLUS":
            return "AB+"
        case "AB_MINUS":
            return "AB-"
        default:
            return "ไม่มีข้อมูล"
    }
}

export const emailTitle = () => {
    return "ยืนยันการสมัคร Intania Run 2024"
}

export const emailText = (user: User) => {
    return "รายละเอียดผู้สมัคร\n" +
        "รหัสใบสมัคร: " + user.runnerNo + "\n" +
        "ชื่อ นามสกุล: " + user.firstName + " " + user.lastName + "\n" +
        "เพศ: " + user.gender + "\n" +
        "วันเกิด: " + user.birthDate.toLocaleDateString('th-TH') + "\n" +
        "อีเมล: " + user.email + "\n" +
        "โทรศัพท์: " + user.phone + "\n" +
        "เลขประจำตัวประชาชน: " + user.citizenId + "\n" +
        "หมู่เลือด: " + bloodTypetoString(user.bloodType) + "\n" +
        `ประเภทการวิ่ง: ${user.selectedPackage === "T" ? "10 กิโลเมตร" : "5 กิโลเมตร"}`
}

export const emailHtml = (
    user: User
) => {
    const emailText = `
        <!DOCTYPE html>
        <html lang="en">
        
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Jockey+One&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
        
            body {
                font-family: 'Inter', Arial, sans-serif;
            }
        
            h1, h2, h3, h4, h5, h6 {
                font-family: 'Jockey One', Arial, sans-serif;
            }
        </style>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Response Email</title>
            <link rel="stylesheet" href="emailresponse.css">
        </head>
        <body style="background-color: rgba(255, 255, 255, 1); display: flex; position: relative; isolation: isolate; flex-direction: row; width: 430px; height: 932px; justify-content: flex-start; align-items: flex-start; padding: 0px; box-sizing: border-box; overflow: hidden;">
            <div style="display: flex; position: absolute; isolation: isolate; flex-direction: row; justify-content: flex-start; align-items: flex-start; padding: 0px; box-sizing: border-box; width: 431px; height: 904px; left: 0px; top: 28px;">
                <div style="background-color: rgba(249, 152, 185, 0.15); width: 66.15px; height: 62.76px; position: absolute; left: 0px; top: 0px;"></div>
                <div style="background-color: rgba(249, 152, 185, 0.15); border-radius: 0px 50px 0px 0px; width: 431px; height: 841.24px; position: absolute; left: 0px; top: 63px;"></div>
            </div>
        
            <img src="image/Rectangle20.svg" alt="Rectangle 20" style="height: 348px; width: 338px; position: absolute; left: 45px; top: 266px;">
        
            <div style="background-color: rgba(255, 255, 255, 1); border-radius: 0px 0px 0px 50px; width: 430px; height: 90px; position: absolute; left: 0px; top: 0px;"></div>
        
            <div style="text-align: center; white-space: pre-wrap; font-synthesis: none; color: rgba(0, 0, 0, 1); font-style: normal; font-family: 'Inter'; font-weight: 700; font-size: 23px; letter-spacing: 0px; text-decoration: none; text-transform: none; position: absolute; left: 144px; top: 205px;">ชำระเงินสำเร็จ</div>
            <div style="text-align: left; white-space: pre-wrap; color: #941214; font-family: 'Inter', Arial, sans-serif; font-weight: 700; font-size: 20px; letter-spacing: 0px; text-decoration: none; text-transform: none; position: absolute; left: 73px; top: 281px;">${user.firstName + " " + user.lastName}</div>
            <div style="text-align: left; white-space: pre-wrap; font-synthesis: none; color: rgba(0, 0, 0, 1); font-style: normal; font-family: 'Inter'; font-weight: 500; font-size: 16px; letter-spacing: 0px; text-decoration: none; text-transform: none; position: absolute; left: 73px; top: 326px;">transaction id: ${user.runnerNo}<br>
        เพศ: ${user.gender}<br>
        วัน เดือน ปีเกิด: ${user.birthDate.toLocaleDateString('th-TH')}<br>
        อีเมล: ${user.email}<br>
        โทรศัพท์: ${user.phone}<br>
        เลขประจำตัวประชาชน: ${user.citizenId}<br>
        หมู่เลือด: ${bloodTypetoString(user.bloodType)}</div>
        
            <img src="image/IntaniarunLogo.png" alt="00logo-main 2" style="height: 56px; width: 113px; object-fit: cover; position: absolute; left: 158px; top: 24px;">
             
            <div style="display: flex; position: absolute; isolation: isolate; flex-direction: row; justify-content: flex-start; align-items: flex-start; padding: 0px; box-sizing: border-box; width: 62.13px; height: 62.13px; left: 181px; top: 122px;">
                <img src="image/EclipseMain/TickCircle.svg" alt="Ellipse 123" style="height: 62.13px; width: 62.13px; position: absolute; left: 0px; top: 0px;">
                <img src="image/EclipseMain/Tick.svg" alt="Icon Solid Check" style="width: 44.08px; height: 44.08px; position: absolute; left: 9px; top: 9px;">
            </div>
            <img src="image/EclipseAmbient/Eclipse129.svg" alt="Ellipse 129" style="height: 8px; width: 8px; position: absolute; left: 254px; top: 120px;">
            <img src="image/EclipseAmbient/Eclipse130.svg" alt="Ellipse 130" style="height: 4px; width: 5px; position: absolute; left: 171px; top: 177px;">
            <img src="image/EclipseAmbient/Eclipse134.svg" alt="Ellipse 134" style="height: 4px; width: 5px; position: absolute; left: 165px; top: 136px;">
            <img src="image/EclipseAmbient/Eclipse131.svg" alt="Ellipse 131" style="height: 3px; width: 3px; position: absolute; left: 223px; top: 107px;">
            <img src="image/EclipseAmbient/Eclipse132.svg" alt="Ellipse 132" style="height: 3px; width: 3px; position: absolute; left: 236px; top: 119px;">
            <img src="image/EclipseAmbient/Eclipse135.svg" alt="Ellipse 135" style="height: 5px; width: 5px; position: absolute; left: 249px; top: 179px;">
            <img src="image/EclipseAmbient/Eclipse137.svg" alt="Ellipse 137" style="height: 4px; width: 3px; position: absolute; left: 249px; top: 164px;">
            <img src="image/EclipseAmbient/Eclipse133.svg" alt="Ellipse 133" style="height: 3px; width: 3px; position: absolute; left: 173px; top: 124px;">
            <img src="image/rectangle24.svg" alt="Rectangle 24" style="height: 131px; width: 338px; position: absolute; left: 45px; top: 641px;">
        
            <div style="text-align: center; white-space: pre-wrap; font-synthesis: none; color: rgba(148, 18, 20, 1); font-style: normal; font-family: 'Inter'; font-weight: 600; font-size: 14px; letter-spacing: 0px; text-decoration: none; text-transform: none; width: 66px; position: absolute; left: 69px; top: 728px;">ของที่ระลึก</div>
            <div style="text-align: left; white-space: pre-wrap; font-synthesis: none; color: rgba(0, 0, 0, 1); font-style: normal; font-family: 'Inter'; font-weight: 700; font-size: 32px; letter-spacing: 0px; text-decoration: none; text-transform: none; width: 117px; height: 41px; position: absolute; left: 69px; top: 655px;">ระยะทาง</div>
            <div style="text-align: left; white-space: pre-wrap; font-synthesis: none; color: rgba(0, 0, 0, 1); font-style: normal; font-family: 'Inter'; font-weight: 700; font-size: 32px; letter-spacing: 0px; text-decoration: none; text-transform: none; width: 117px; height: 41px; position: absolute; left: 284px; top: 661px;">${user.selectedPackage === "T" ? "10" : "5"} KM</div>
            <div style="display: flex; position: absolute; isolation: isolate; flex-direction: row; justify-content: flex-start; align-items: flex-start; padding: 0px; box-sizing: border-box; width: 214.2px; height: 23.14px; left: 149px; top: 726px;">
                <div style="background-color: rgba(76, 183, 26, 0.5); border-radius: 16px 16px 15px 15px; width: 62.19px; height: 23.14px; position: absolute; left: 0px; top: 0px;"></div>
                <div style="background-color: rgba(76, 183, 26, 0.5); border-radius: 16px 16px 15px 15px; width: 68.11px; height: 23.14px; position: absolute; left: 70px; top: 0px;"></div>
                <div style="text-align: center; white-space: pre-wrap; font-synthesis: none; color: rgba(30, 30, 30, 1); font-style: normal; font-family: 'Inter'; font-weight: 500; font-size: 12px; letter-spacing: -0.1540000033378601px; text-decoration: none; line-height: 150%; text-transform: none; width: 33.56px; height: 22.09px; position: absolute; left: 14px; top: 3px;">เสื้อวิ่ง</div>
                <div style="text-align: center; white-space: pre-wrap; font-synthesis: none; color: rgba(30, 30, 30, 1); font-style: normal; font-family: 'Inter'; font-weight: 500; font-size: 12px; letter-spacing: -0.1540000033378601px; text-decoration: none; line-height: 150%; text-transform: none; width: 50.34px; height: 22.09px; position: absolute; left: 79px; top: 3px;">เหรียญ</div>
                <div style="background-color: rgba(76, 183, 26, 0.5); border-radius: 16px 16px 15px 15px; width: 68.11px; height: 23.14px; position: absolute; left: 146px; top: 0px;"></div>
                <div style="text-align: center; white-space: pre-wrap; font-synthesis: none; color: rgba(30, 30, 30, 1); font-style: normal; font-family: 'Inter'; font-weight: 500; font-size: 12px; letter-spacing: -0.1540000033378601px; text-decoration: none; line-height: 150%; text-transform: none; width: 50.34px; height: 22.09px; position: absolute; left: 155px; top: 3px;">ป้าย bib</div>
            </div>
            <div style="text-align: center; white-space: pre-wrap; font-synthesis: none; color: rgba(255, 255, 255, 0.5); 
            font-style: normal; font-family: 'Jockey One'; font-weight: 400; font-size: 110px; letter-spacing: 32.45px; 
            text-decoration: none; text-transform: none; -webkit-text-stroke: 1px rgba(148, 18, 20, 1); 
            position: absolute; left: 95px; top: 770px;">RUN</div>
            <img src="image/RunBottom.png" alt="Untitled Artwork (1) 1" style="height: 126px; width: 184px; position: absolute; left: 119px; top: 787px;">
        
        </body>
        </html>
`
    return emailText
}