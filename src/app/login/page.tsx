'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonLink from "@/components/common/buttonLink";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setTokenCookie } from '@/actions/actions';
import { useUser } from '@/contexts/userContext';


export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const { setUser } = useUser()
  const [registeredCredentials, setRegisteredCredentials] = useState({
    email: '',
    password: ''
  });


interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AxiosErrorResponse {
  response?: {
    status: number;
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
  message?: string;
}
  
function parseError(error: AxiosErrorResponse): string {
  if (!error.response) {
    return "خطای ناشناخته! لطفاً اتصال اینترنت را بررسی کنید.";
  }

  const status = error.response.status;
  const data = error.response.data;
  const message = data?.message?.toLowerCase?.() || "";

  if (status === 409 || status === 422 || status === 400) {
    if (message.includes("email") && message.includes("taken")) {
      return "این ایمیل قبلاً ثبت شده است.";
    }
    if ((message.includes("mobile") || message.includes("phone")) && message.includes("taken")) {
      return "این شماره تلفن قبلاً ثبت شده است.";
    }
  }

  switch (status) {
    case 400:
      return "درخواست نامعتبر است. لطفاً اطلاعات را بررسی کنید.";
    case 401:
    case 403:
      return "دسترسی غیرمجاز! لطفاً وارد حساب خود شوید.";
    case 404:
      return "منبع مورد نظر یافت نشد.";
    case 409:
      return "درخواست تکراری یا داده‌ها در تضاد هستند.";
    case 422:
      if (data?.errors) {
        const errors = Object.values(data.errors).flat();
        if (typeof errors[0] === "string") {
          return errors[0];
        }
        return "خطا در اعتبارسنجی اطلاعات.";
      }
      return message || "خطا در اعتبارسنجی اطلاعات.";
    case 500:
      return "خطای داخلی سرور! لطفاً بعداً دوباره تلاش کنید.";
    case 502:
    case 503:
    case 504:
      return "سرور در دسترس نیست! لطفاً بعداً امتحان کنید.";
    default:
      return message || "خطایی رخ داده است.";
  }
}



  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: registeredCredentials.email,
      password: registeredCredentials.password,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('ایمیل نامعتبر است').required('ایمیل الزامی است'),
      password: Yup.string()
        .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
        .matches(/(?=.*[a-z])/, 'رمز عبور باید شامل حروف کوچک انگلیسی باشد')
        .matches(/(?=.*[A-Z])/, 'رمز عبور باید شامل حروف بزرگ انگلیسی باشد')
        .matches(/(?=.*\d)/, 'رمز عبور باید شامل عدد باشد')
        .required('رمز عبور الزامی است'),
    }),
    onSubmit: async (values: LoginValues) => {
      try {
        const response = await axios.post("https://api.lightsostudio.com/api/login", {
          email: values.email,
          password: values.password,
        });
    
        const token = response.data.token;
        localStorage.setItem("token", token);
        router.refresh();
        if (token) {
          await setTokenCookie(token);
        }
    
        toast.success("ورود با موفقیت انجام شد");
    
        const userRes = await axios.get("https://api.lightsostudio.com/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setUser(userRes.data);
        router.push("/");
      } catch (error: unknown) {
        // تایپ امن: ابتدا چک می‌کنیم که error شیء ای است که ویژگی response دارد (axios error)
        if (axios.isAxiosError(error)) {
          const message = parseError(error);
          toast.error(message);
          console.error("خطای لاگین:", error.response?.data || error.message);
        } else {
          // هر نوع خطای دیگری
          toast.error("خطای ناشناخته رخ داد.");
          console.error("خطای لاگین:", error);
        }
      }
    }
    
    
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("نام الزامی است"),
      phone: Yup.string()
        .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
        .required("تلفن الزامی است"),
      email: Yup.string()
        .email("ایمیل نامعتبر است")
        .required("ایمیل الزامی است"),
      password: Yup.string()
        .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
        .matches(/(?=.*[a-z])/, 'رمز عبور باید شامل حروف کوچک انگلیسی باشد')
        .matches(/(?=.*[A-Z])/, 'رمز عبور باید شامل حروف بزرگ انگلیسی باشد')
        .matches(/(?=.*\d)/, 'رمز عبور باید شامل عدد باشد')
        .required("رمز عبور الزامی است"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "رمز عبور تطابق ندارد")
        .required("تکرار رمز عبور الزامی است"),
    }),
    onSubmit: async (values: RegisterValues) => {
      try {
        await axios.post(
          "https://api.lightsostudio.com/api/register",
          {
            name: values.name,
            email: values.email,
            mobile: values.phone,
            password: values.password,
            password_confirmation: values.confirmPassword,
          },
        );
    
        toast.success("ثبت‌نام با موفقیت انجام شد");
        setRegisteredCredentials({
          email: values.email,
          password: values.password,
        });
        setTab("login");
    
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = parseError(error);
          toast.error(message);
          console.error("خطا در ثبت‌نام:", error.response?.data || error.message);
        } else {
          toast.error("خطای ناشناخته رخ داد.");
          console.error("خطا در ثبت‌نام:", error);
        }
      }
    }
    
    
  });

  return (
    <div dir="rtl" className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 overflow-hidden">
      <div className="bg-white min-h-96 max-h-[650px] shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6 z-10 overflow-y-auto">
        <div className="flex justify-center rounded-full bg-gray-100 w-fit mx-auto mb-4">
          <button
            className={clsx(
              'min-w-24 md:min-w-32 py-1.5 cursor-pointer text-sm rounded-full transition',
              tab === 'login'
                ? 'bg-[#28A6DB] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            onClick={() => setTab('login')}
          >
            ورود
          </button>
          <button
            className={clsx(
              'min-w-24 md:min-w-32 py-2 cursor-pointer text-sm rounded-full transition',
              tab === 'register'
                ? 'bg-[#28A6DB] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            onClick={() => setTab('register')}
          >
            ثبت‌نام
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {tab === 'login' ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
              onSubmit={loginForm.handleSubmit}
            >
              <h2 className="text-base sm:text-xl text-gray-900">ورود به حساب کاربری</h2>
              
              {/* نمایش پیام اطلاع‌رسانی در صورت وجود اطلاعات از ثبت‌نام */}
              {registeredCredentials.email && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
                  اطلاعات شما از ثبت‌نام قبلی پر شده است
                </div>
              )}
              
              <InputField
                form={loginForm}
                name="email"
                type="email"
                placeholder="ایمیل"
              />
              <InputField
                form={loginForm}
                name="password"
                type="password"
                placeholder="رمز عبور"
              />
              <div className='flex w-full items-center justify-end'>
                <ButtonLink text="ورود" type='submit' />
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
              onSubmit={registerForm.handleSubmit}
            >
              <h2 className="text-base sm:text-xl text-gray-900">ساخت حساب جدید</h2>
              <InputField
                form={registerForm}
                name="name"
                type="text"
                placeholder="نام و نام خانوادگی"
              />
              <InputField 
                form={registerForm} 
                name="phone" 
                type="tel" 
                placeholder="تلفن همراه" 
              />
              <InputField
                form={registerForm}
                name="email"
                type="email"
                placeholder="ایمیل"
              />
              <InputField
                form={registerForm}
                name="password"
                type="password"
                placeholder="رمز عبور"
              />
              <InputField
                form={registerForm}
                name="confirmPassword"
                type="password"
                placeholder="تکرار رمز عبور"
              />
              <div className='flex w-full items-center justify-end'>
                <ButtonLink text="ثبت نام" type="submit" />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


interface InputFieldProps<T> {
  form: {
    values: T;
    errors: FormikErrors<T>;
    touched: FormikTouched<T>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleBlur: React.FocusEventHandler<HTMLInputElement>;
  };
  name: keyof T;
  type: string;
  placeholder: string;
}


function InputField<T>({ form, name, type, placeholder }: InputFieldProps<T>) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name as string}
        placeholder={placeholder}
        className="w-full px-4 py-2 flex text-xs sm:text-sm border border-slate-300/60 rounded-xl focus:outline-none text-right"
        value={
          typeof form.values[name] === "string" ||
          typeof form.values[name] === "number"
            ? form.values[name]
            : ""
        }
        
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />

      {form.touched[name] && form.errors[name] && (
        <p className="text-red-500 text-xs mt-1 absolute -top-3 left-5 px-1.5 bg-white">
          {form.errors[name] as string}
        </p>
      )}
    </div>
  );
}