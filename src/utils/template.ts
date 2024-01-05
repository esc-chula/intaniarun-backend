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
    return 'ยืนยันการสมัครกิจกรรม Chula Intania Run 2024';
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
    return `<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Chula Intaniarun 2024</title><!--[if mso]><style>*{font-family:sans-serif!important}</style><![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]--><style>*{font-family:'Noto Sans Thai',sans-serif}</style></head><body style="background-color:#fef0f5"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:12px auto"><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:220px;margin:8px auto"><tr><td><img style="max-width:220px;height:auto;margin:0 auto" alt="Chula Intaniarun 2024 Logo" src="https://www.chulaintaniarun2024.com/static/logo.png"></td></tr></table></td></tr></table></td></tr></table></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:12px auto;padding:24px;background-color:#fff;border-radius:12px"><tr><td><p>เรียน คุณ${user.firstName
        } ${user.lastName
        }</p><p>กรรมการนิสิตคณะวิศวกรรมศาสตร์ (กวศ.) ร่วมกับ สมาคมนิสิตเก่าวิศวกรรมศาสตร์แห่งจุฬาลงกรณ์มหาวิทยาลัย (สวจ.)ในฐานะผู้จัดงานวิ่งการกุศล Chula Intania Run 2024 ในวันอาทิตย์ที่ 21 มกราคม พ.ศ. 2567 ยินดีเป็นอย่างยิ่งที่จะแจ้งให้ท่านทราบว่า คำขอสมัครเข้าร่วมกิจกรรมของท่านได้รับการอนุมัติแล้ว โดยท่านสามารถตรวจสอบข้อมูลการร่วมกิจกรรมของท่านได้ตามรายละเอียดดังต่อไปนี้</p></td></tr><tr><td style="padding-top:32px"><table><tr><td style="padding-right:16px">ประเภทผู้ร่วมกิจกรรม:</td><td style="padding-right:16px">${user.type === 'VIP' ? 'VIP'
            : user.type === 'ALUMNI' ? 'นิสิตเก่าวิศวฯ จุฬาฯ'
                : user.type === 'ACQUAINTANCE' ? 'ครอบครัวและเพื่อนของนิสิตเก่า'
                    : user.type === 'STUDENT' ? 'นิสิตปัจจุบัน'
                        : user.type === 'CHULA' ? 'ประชาคมจุฬาฯ'
                            : user.type === 'EXTRA' ? 'เพิ่มเติม'
                                : 'ประชาชนทั่วไป'}</td></tr><tr><td style="padding-right:16px">ระยะทางวิ่ง:</td><td style="padding-right:16px">${user.selectedPackage
        } กม.</td></tr><tr><td style="padding-right:16px">ขนาดเสื้อ:</td><td style="padding-right:16px">${user.shirtSize
        }</td></tr></table></td></tr><tr><td style="padding-top:48px"><p>ท่านสามารถรับเสื้อวิ่ง หมายเลขประจำตัว (BIB) และของที่ระลึกประจำงานได้ในวันที่ 19-20 มกราคม พ.ศ. 2567 เวลา 9.00 - 17.30 น. ณ โถงอาคารวิศวฯ 100 ปี คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</p><p>โปรดติดตามข่าวสารงานวิ่งการกุศล Chula Intania Run 2024 ได้ทาง<a href="https://www.chulaintaniarun2024.com">www.chulaintaniarun2024.com</a>หากท่านต้องการสอบถามข้อมูลเพิ่มเติมกรุณาแอด<br>LINE OA :<a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=ugu3608c">IntaniaAlumni</a></p></td></tr><tr><td style="padding-top:32px"><p>ขอแสดงความนับถือ</p></td></tr></table></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:12px auto;padding:24px;background-color:#fff;border-radius:12px"><tr><td style="padding-top:24px"><img style="width:100%;height:auto" alt="กำหนดการวันจริง" src="https://www.chulaintaniarun2024.com/static/schedule.png"></td></tr><tr><td style="padding-top:24px"><img style="width:100%;height:auto" alt="รูปแผนที่ตึกวิศวฯ 100 ปี สำหรับรับเสื้อ" src="https://www.chulaintaniarun2024.com/static/faculty_map.png"></td></tr></table></td></tr></table></body></html>`;
};

export const emailBibNumberHtml = (user: User) => {
    return `<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Chula Intaniarun 2024</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap" rel="stylesheet" type="text/css"><style>*{font-family:'Noto Sans Thai',sans-serif}</style></head><body style="background-color:#fef0f5"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:12px auto"><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:220px;margin:8px auto"><tr><td><img style="max-width:220px;height:auto;margin:0 auto" alt="Chula Intaniarun 2024 Logo" src="https://www.chulaintaniarun2024.com/static/logo.png"></td></tr></table></td></tr></table></td></tr></table></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:12px auto;padding:24px;background-color:#fff;border-radius:12px"><tr><td><p>เรียน คุณ${user.firstName} ${user.lastName}</p><p>กรรมการนิสิตคณะวิศวกรรมศาสตร์ (กวศ.) ร่วมกับ สมาคมนิสิตเก่าวิศวกรรมศาสตร์แห่งจุฬาลงกรณ์มหาวิทยาลัย (สวจ.)ในฐานะผู้จัดงานวิ่งการกุศล Chula Intania Run 2024 ในวันอาทิตย์ที่ 21 มกราคม พ.ศ. 2567 ทางเราได้แนบ “หมายเลขประจำตัว (BIB)” มาใน Email ฉบับนี้เรียบร้อย</p></td></tr></table></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:12px auto;padding:24px;background-color:#fff;border-radius:12px"><tr><td><img style="width:100%;height:auto" alt="BIB" src="https://www.chulaintaniarun2024.com/api/og/bib-email-template?bib_number=${user.runnerNo}"></td></tr></table></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:12px auto;padding:24px;background-color:#fff;border-radius:12px"><tr><td><p>ท่านสามารถรับเสื้อวิ่ง หมายเลขประจำตัว (BIB) และของที่ระลึกประจำงานได้ในวันที่ 19-20 มกราคม พ.ศ. 2567 เวลา 9.00 - 17.30 น. ณ โถงอาคารวิศวฯ 100 ปี คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</p><p>สำคัญ!!!<br>โปรดเตรียมรูปหมายเลขประจำตัว (BIB) ในอีเมลและบัตรประชาชนเพื่อเป็นหลักฐานในการรับเสื้อวิ่ง</p><p>***กรณีที่รับแทนนักวิ่งให้เตรียมสำเนาบัตรประชาชนของนักวิ่งมาเพื่อเป็นหลักฐาน***</p><p>โปรดติดตามข่าวสารงานวิ่งการกุศล Chula Intania Run 2024 ได้ทาง<a href="https://www.chulaintaniarun2024.com">www.chulaintaniarun2024.com</a>หากท่านต้องการสอบถามข้อมูลเพิ่มเติมกรุณาแอด<br>LINE OA :<a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=ugu3608c">IntaniaAlumni</a></p></td></tr><tr><td style="padding-top:32px"><p>ขอแสดงความนับถือ</p></td></tr></table></td></tr></table></body></html>`
}