
const errorMapping = {
    'auth/user-not-found' : "Please enter a valid email address or signup",
    'auth/wrong-password' : "Incorrect credentials",
    'auth/email-already-in-use' : "Email already in use",
    'auth/weak-password' : 'Password must be 6 or more characters long',
    'auth/unknown' : 'Please try again later'
}
//this is an object which maps firebase error codes to user friendly messages
export default errorMapping;