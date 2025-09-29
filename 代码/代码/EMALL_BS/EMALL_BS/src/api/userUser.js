import { ref } from 'vue';

const user = ref({
  username: ' fzc',
  password: '123456',
  name: '范子宸>_<唐',
  age: 20,
  address: '中国河南省郑州-郑州轻工业大学第二生活区',
  gender: 1,
  phone: '13800138000',
  userRole: 'admin',
});

export function useUser() {
  const updateUser = (newUser) => {
    user.value = newUser;
  };

  return {
    user,
    updateUser,
  };
}
