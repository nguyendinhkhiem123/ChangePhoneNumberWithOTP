import AxiosClient from "../../common/util/api";

export const login = (body) => {
  return AxiosClient.post("api/login", body);
};

export const getPhoneNumberOfMember = () => {
  return AxiosClient.get("api/Member/phone-number");
};

export const getOTP = (body) => {
  return AxiosClient.put("api/Member/phone-number/validate", body);
};

export const updatePhoneNumberWithOTP = (body) => {
  return AxiosClient.post("api/OTP/authentication", body);
};
