export const reportError = ({ error, ...props }) => {
  try {
    console.log({ error, ...props });
  } catch (error) {
    console.log({ error, ...props });
  }
};
