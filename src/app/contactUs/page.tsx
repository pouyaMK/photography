"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ButtonLink from "@/components/common/buttonLink"
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/userContext';
import axios from "axios";

interface ContactFormValues {
  message: string;
}

const ContactForm = () => {
  const router = useRouter();
  const { user, loading } = useUser(); 

  const validationSchema = Yup.object({
    message: Yup.string()
      .min(10, 'پیام باید حداقل 10 کاراکتر باشد')
      .required('وارد کردن پیام الزامی است'),
  });
    
  const initialValues: ContactFormValues = {
    message: '',
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm, setSubmitting }: FormikHelpers<ContactFormValues>
  ) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("لطفاً ابتدا وارد حساب کاربری شوید");
      router.push("/login");
      return;
    }

    try {
      setSubmitting(true);
      toast.success("پیام شما با موفقیت ارسال شد");
      resetForm();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("احراز هویت نامعتبر است. لطفاً مجدداً وارد شوید");
          localStorage.removeItem("token");
          router.push("/login");
        } else if (error.response?.status === 422) {
          const errors = error.response.data.errors;
          if (errors?.message) {
            toast.error(errors.message[0]);
          } else {
            toast.error("اطلاعات وارد شده نامعتبر است");
          }
        } else {
          toast.error("ارسال پیام با خطا مواجه شد");
        }
        console.error("خطا:", error.response?.data || error.message);
      } else {
        toast.error("خطای ناشناخته‌ای رخ داده است");
        console.error("خطای ناشناخته:", error);
      }
    }
  } 

  return (
    <div className="min-h-screen relative flex items-center justify-center  mb-20">
      <div className="w-[85%] lg:w-[80%]">
        <div className="flex mb-4 md:mb-12 items-center justify-start gap-2 mt-16 md:mt-20 !text-slate-500">
          <Link href="/" className="hover:text-[#28A6DB] text-xs sm:text-sm ">
            خانه
          </Link>
          <p>/</p>
          <span className="text-slate-600 text-xs sm:text-sm ">
            ارتباط با ما
          </span>
        </div>
        <div className="grid md:ml-12 grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-12">
          <div className="flex flex-col space-y-8 md:space-y-20">
            <div>
              <h3 className="text-xl md:text-4xl text-slate-800 font-semibold mb-0 md:mb-4">
                ارتباط با ما
              </h3>
              <p className="text-xs sm:text-base md:text-xl">
                سوالی دارید یا به کمک نیاز دارید؟ از طریق فرم تماس، ایمیل یا
                تلفن با ما در ارتباط باشید—ما اینجاییم تا به شما کمک کنیم و در
                اسرع وقت پاسخگو خواهیم بود!
              </p>
            </div>
            <section className="flex lg:flex-row xl:flex-row flex-col sm:flex-row items-start gap-2  sm:gap-10">
              <div className=" py-2 md:py-6 rounded-2xl flex flex-col items-start ">
                <div className=" p-2 bg-[#EDF6FC] rounded-2xl mb-1">
                  <Icon
                    icon={"flowbite:messages-solid"}
                    className="w-12 h-12 text-[#28A6DB]"
                  />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-semibold mb-2">
                    پیام
                  </h3>
                  <p className="text-gray-600 font-medium text-sm md:text-base mb-2">
                    پیام بفرستید و بلافاصله پشتیبانی مورد نیاز خود را دریافت
                    کنید.
                  </p>
                  <div className="bg-[#28A6DB] opacity-30 h-[0.3px] w-full my-2" />
                  <div className="w-full flex items-start justify-between  flex-col">
                    <Link
                      href="mailto:maryam_mirmohammad@gmail.com"
                      className="text-[#28A6DB] font-semibold flex items-center justify-center gap-1"
                    >
                      <Icon icon={"bxl:gmail"} className="text-black" />
                      maryam_mirmohammad@gmail.com
                    </Link>
                    <Link
                      href="https://t.me/maryam_mirmohammad"
                      className="text-[#28A6DB] font-semibold flex items-center justify-center gap-1"
                    >
                      <Icon
                        icon={"basil:telegram-solid"}
                        className="text-black"
                      />
                      maryam_mirmohammad@
                    </Link>
                    <Link
                      href="https://www.instagram.com/maryam.mhd.photographer"
                      className="text-[#28A6DB] font-semibold flex items-center justify-center gap-1"
                    >
                      <Icon icon={"ri:instagram-fill"} className="text-black" />
                      maryam.mhd.photographer
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="lg:col-span-2 relative mt-10 md:mt-0 bg-[#FAFDFE] p-4 md:p-6 rounded-3xl shadow-[0px_0px_30px_0px_#bee3f8]">
            <div
              className="absolute hidden sm:flex top-20 -left-10 -z-10 w-96 h-96 bg-white shadow-[0px_0px_30px_0px_#bee3f8] rounded-t-3xl transform -rotate-12"
              aria-hidden="true"
            ></div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <div className="flex items-center justify-start gap-2">
                    <Icon
                      icon={"tabler:message"}
                      className="w-7 h-7 text-[#28A6DB]"
                    />
                    <h3 className="text-base md:text-2xl">
                      ارتباط با مریم میرمحمد
                    </h3>
                  </div>

                  {!loading && !user && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon
                          icon={"mdi:information"}
                          className="w-5 h-5 text-[#28A6DB]"
                        />
                        <span className="text-sm font-medium text-[#28A6DB]">
                          نکته مهم
                        </span>
                      </div>
                      <p className="text-xs text-[#28A6DB]">
                        برای ارسال پیام، ابتدا باید وارد حساب کاربری خود شوید.
                        اگر حساب کاربری ندارید،
                        <Link
                          href="/login"
                          className="underline font-semibold"
                        >
                          {" "}
                          ثبت نام کنید{" "}
                        </Link>
                        یا
                        <Link href="/login" className="underline font-semibold">
                          {" "}
                          وارد شوید{" "}
                        </Link>
                      </p>
                    </div>
                  )}

                  <div className="relative">
                    <label className="text-xs sm:text-sm text-slate-700">
                      متن پیام
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="پیام خود را بنویسید... (حداقل 10 کاراکتر)"
                      className="input-field border max-h-60 min-h-52 lg:min-h-64 focus:outline-none border-slate-200 px-4 py-2 sm:py-4 bg-white rounded-xl w-full mt-2 text-xs sm:text-sm"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 absolute top-4 py-0.5 left-2 z-10 text-xs bg-white px-2 rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <ButtonLink
                      text={isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
                      type="submit"
                      disabled={isSubmitting}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;