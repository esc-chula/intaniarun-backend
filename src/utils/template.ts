import { $Enums, User } from '@prisma/client';

const bloodTypetoString = (bloodType: $Enums.BloodType) => {
    switch (bloodType) {
        case 'A_PLUS':
            return 'A+';
        case 'A_MINUS':
            return 'A-';
        case 'B_PLUS':
            return 'B+';
        case 'B_MINUS':
            return 'B-';
        case 'O_PLUS':
            return 'O+';
        case 'O_MINUS':
            return 'O-';
        case 'AB_PLUS':
            return 'AB+';
        case 'AB_MINUS':
            return 'AB-';
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
        'เลขประจำตัวประชาชน: ' +
        user.citizenId +
        '\n' +
        'หมู่เลือด: ' +
        bloodTypetoString(user.bloodType) +
        '\n' +
        `ประเภทการวิ่ง: ${
            user.selectedPackage === 'T' ? '10 กิโลเมตร' : '5 กิโลเมตร'
        }`
    );
};
