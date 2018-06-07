const bcrypt = require('bcryptjs');

var password = '123abc';
// bcrypt.genSalt(10, (err, salt) => {
//     console.log('salt :', salt);
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log('hash :', hash);
//     });
// });

var hashedPassword = '$2a$10$CGSSxOgArV.LE9T58qtnTeNU.ij28vQQC/1piQDQEHWn0LUYX7gAW';

bcrypt.compare(password, hashedPassword, (err, res) => {
    // res === true
    console.log('res :', res);
});