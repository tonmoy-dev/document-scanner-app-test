// utils/showCustomAlert.js
import { Alert } from 'react-native';

/**
 * Reusable Alert utility
 *
 * @param {Object} params
 * @param {string} params.title - Alert title
 * @param {string} params.message - Alert message
 * @param {string} [params.okText='OK'] - OK button text
 * @param {function} [params.onOkPress] - OK button onPress handler
 * @param {string} [params.cancelText] - Cancel button text (omit to exclude)
 * @param {function} [params.onCancelPress] - Cancel button onPress handler (omit to exclude)
 * @param {boolean} [params.cancelable=true] - Allow tap outside to dismiss
 * @param {function} [params.onDismiss] - Function to run on dismiss (optional)
 */
const showCustomAlert = ({
  title,
  message,
  okText = 'OK',
  onOkPress = () => { },
  cancelText,
  onCancelPress,
  cancelable = true,
  onDismiss,
}) => {
  const buttons = [];

  if (cancelText && onCancelPress) {
    buttons.push({
      text: cancelText,
      onPress: onCancelPress,
      style: 'cancel',
    });
  }

  buttons.push({
    text: okText,
    onPress: onOkPress,
  });

  Alert.alert(title, message, buttons, {
    cancelable,
    onDismiss,
  });
};

export default showCustomAlert;



// showCustomAlert({
//   title: 'Success',
//   message: 'Data has been saved!',
//   okText: 'Got it',
//   onOkPress: () => console.log('OK Pressed'),
// });

// showCustomAlert({
//   title: 'Delete',
//   message: 'Are you sure you want to delete this?',
//   okText: 'Delete',
//   onOkPress: () => console.log('Deleted'),
//   cancelText: 'Cancel',
//   onCancelPress: () => console.log('Cancelled'),
// });

// showCustomAlert({
//   title: 'Warning',
//   message: 'This action is required.',
//   cancelable: false,
// });

// showCustomAlert({
//   title: 'Image not in correct format',
//   message: 'Rotate your phone to match the passport image size. Please retake the photo.',
//   okText: 'OK',
//   onOkPress: () => console.log('Ok Pressed'),
//   cancelable: false,
// });