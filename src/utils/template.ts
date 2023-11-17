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
