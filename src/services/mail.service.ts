import { send } from '@emailjs/react-native';

export async function sendEmail(email: string): Promise<boolean> {
  try {
    const response = await send(
      'service_1o5mw2e',
      'template_mhy7z5r',
      {
        name: 'Nguyen Dao',
        title: 'Medsiki',
        email: email,
        message: 'Chúc mừng bạn đã đăng kí thành công 🎉',
      },
      {
        publicKey: 'nbiiTnKkAYKj5RfwR',
      },
    );

    console.log('✅ SUCCESS:', response.status, response.text);
    return true;
  } catch (err) {
    console.log('❌ ERROR ENTERED');
    console.error(err);
    return false;
  }
}

// export async function sendOtpEmail(
//   email: string,
// ): Promise<{ success: boolean; otp?: string }> {
//   const otp = generateOtp();

//   try {
//     const response = await send(
//       'service_1o5mw2e',
//       'template_mhy7z5r',
//       {
//         name: 'Nguyen Dao',
//         title: 'Medsiki',
//         email: email,
//         message: otp,
//       },
//       {
//         publicKey: 'nbiiTnKkAYKj5RfwR',
//       },
//     );

//     console.log('✅ SUCCESS:', response.status, response.text);
//     return { success: true, otp };
//   } catch (err) {
//     console.log('❌ ERROR ENTERED');
//     console.error(err);
//     return {success: false};
//   }
// }

// //hàm tạo mã otp
// function generateOtp(length = 6): string {
//   return Math.floor(
//     Math.pow(10, length - 1) + Math.random() * Math.pow(10, length - 1),
//   ).toString();
// }
