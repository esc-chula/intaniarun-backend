import { $Enums, User } from '@prisma/client';

const bloodTypetoString = (bloodType: $Enums.BloodType) => {
    switch (bloodType) {
        case 'A':
            return 'A';
        case 'B':
            return 'B';
        case 'O':
            return 'O';
        case 'AB':
            return 'AB';
        default:
            return 'ไม่มีข้อมูล';
    }
};

export const emailTitle = () => {
    return 'ยืนยันการสมัคร Intania Run 2024';
};

export const emailText = (user: User) => {
    return (
        'รายละเอียดผู้สมัคร\n' +
        'รหัสใบสมัคร: ' +
        user.runnerNo +
        '\n' +
        'ชื่อ นามสกุล: ' +
        user.firstName +
        ' ' +
        user.lastName +
        '\n' +
        'เพศ: ' +
        user.gender +
        '\n' +
        'วันเกิด: ' +
        user.birthDate.toLocaleDateString('th-TH') +
        '\n' +
        'อีเมล: ' +
        user.email +
        '\n' +
        'โทรศัพท์: ' +
        user.phone +
        '\n' +
        'หมู่เลือด: ' +
        bloodTypetoString(user.bloodType) +
        '\n' +
        `ประเภทการวิ่ง: ${user.selectedPackage} กิโลเมตร`
    );
};

export const emailHtml = (user: User) => {
    return `<html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Chula Intaniarun 2024</title>     <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap" rel="stylesheet" type="text/css" />  <style> * { font-family: 'Noto Sans Thai', sans-serif; } </style> </head> <body style="background-color: #fef0f5"> <table border="0" cellpadding="0" cellspacing="0" width="100%">  <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 12px auto" > <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" > <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" max-width: 220px; margin: 8px auto; " > <tr> <td> <img style=" max-width: 220px; height: auto; margin: 0 auto; " alt="Chula Intaniarun 2024 Logo" src="https://www.chulaintaniarun2024.com/static/logo.png" /> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr>  <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" max-width: 640px; margin: 12px auto; padding: 24px; background-color: white; border-radius: 12px; " > <tr> <td> <p> เรียน คุณ${user.firstName} ${user.lastname} </p> <p> กรรมการนิสิตคณะวิศวกรรมศาสตร์ (กวศ.) ร่วมกับ สมาคมนิสิตเก่าวิศวกรรมศาสตร์แห่งจุฬาลงกรณ์มหาวิทยาลัย (สวจ.)ในฐานะผู้จัดงานวิ่งการกุศล Chula Intania Run 2024 ในวันอาทิตย์ที่ 21 มกราคม พ.ศ. 2567 ยินดีเป็นอย่างยิ่งที่จะแจ้งให้ท่านทราบว่า คำขอสมัครเข้าร่วมกิจกรรมของท่านได้รับการอนุมัติแล้ว โดยท่านสามารถตรวจสอบข้อมูลการร่วมกิจกรรมของท่านได้ตามรายละเอียดดังต่อไปนี้ </p> </td> </tr> <tr> <td style="padding-top: 32px"> <table> <tr> <td style="padding-right: 16px"> หมายเลขประจำตัว (BIB): </td> <td style="padding-right: 16px"> ${user.runnerNo} </td> </tr> <tr> <td style="padding-right: 16px"> ประเภทผู้ร่วมกิจกรรม: </td> <td style="padding-right: 16px"> ${user.type} </td> </tr> <tr> <td style="padding-right: 16px"> ระยะทางวิ่ง: </td> <td style="padding-right: 16px"> ${user.selectedPackage} </td> </tr> <tr> <td style="padding-right: 16px"> ขนาดเสื้อ: </td> <td style="padding-right: 16px"> ${user.shirtSize} </td> </tr> </table> </td> </tr> <tr> <td style="padding-top: 48px"> <p> ท่านสามารถรับเสื้อวิ่ง หมายเลขประจำตัว (BIB) และของที่ระลึกประจำงานได้ในวันที่ 19-20 มกราคม พ.ศ. 2567 เวลา 9.00 - 17.30 น. ณ โถงอาคารวิศวฯ 100 ปี คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย </p> <p> โปรดติดตามข่าวสารงานวิ่งการกุศล Chula Intania Run 2024 ได้ทาง <a href="https://www.chulaintaniarun2024.com" >www.chulaintaniarun2024.com</a > หากท่านต้องการสอบถามข้อมูลเพิ่มเติมกรุณาแอด <br /> LINE OA : INTANIA ALUMNI </p> </td> </tr> <tr> <td style="padding-top: 32px"> <p>ขอแสดงความนับถือ</p> </td> </tr> </table> </td> </tr>  <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" max-width: 640px; margin: 12px auto; padding: 24px; background-color: white; border-radius: 12px; " > <tr> <td style="padding-top: 24px"> <img style="width: 100%; height: auto" alt="กำหนดการวันจริง" src="https://www.chulaintaniarun2024.com/static/schedule.png" /> </td> </tr> <tr> <td style="padding-top: 24px"> <img style="width: 100%; height: auto" alt="รูปแผนที่ตึกวิศวฯ 100 ปี สำหรับรับเสื้อ" src="https://www.chulaintaniarun2024.com/static/faculty_map.png" /> </td> </tr> <tr> <td style="padding-top: 24px"> <img style="width: 100%; height: auto" alt="ใบเสร็จรับเงิน" src="https://www.chulaintaniarun2024.com/api/og/receipt?hr_number=${user.runnerNo}&payment_date=15/11/2566&account_date=17/11/2566&name=${user.firstName}%20${user.lastName}&run_package=${user.type}&run_distance=${user.distance}&amount=1" /> </td> </tr> </table> </td> </tr> </table> </body> </html>`;
};