import to from './to'

export interface ApiResponse<T = any> {
  code: number;
  sub_code: string;
  msg: string;
  sub_msg: string;
  data?: T;
}

export const sendWaitListEmail = async (data: any) => {
  return to<ApiResponse>(fetch('https://api.qdkf.net/api/email/send', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json()))
}
