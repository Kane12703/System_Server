import * as bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = bcryptjs.genSaltSync(10);
    return await bcryptjs.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcryptjs.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
};
