'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import moment from 'moment-jalaali';
import 'moment/locale/fa';
import 'moment-jalaali';
import ButtonLink from "@/components/common/buttonLink"
import axios from "axios"

moment.loadPersian({ dialect: 'persian-modern' });

export default function PhotoBookingForm() {
  const router = useRouter();
    
  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
      description: '',
    },
    validationSchema: Yup.object({
      date: Yup.string()
        .required('تاریخ الزامی است')
        .matches(/^\d{4}\/\d{2}\/\d{2}$/, 'فرمت تاریخ باید به صورت 1403/05/06 باشد'),
      time: Yup.string()
        .required('ساعت الزامی است')
        .matches(/^\d{2}:\d{2}$/, 'فرمت زمان باید به صورت 14:30 باشد'),
      description: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem('token');
            
      if (!token) {
        toast.error('لطفاً ابتدا وارد حساب کاربری شوید');
        router.push('/login');
        return;
      }
                
      try {
        // ارسال رویداد به اندپوینت events
        const eventResponse = await axios.post(
          'https://api.lightsostudio.com/api/events',
          {
            date: values.date,
            time: values.time,
            description: values.description || 'رزرو نوبت عکاسی',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // ارسال پیام به اندپوینت messages (همراه با تاریخ و زمان)
        const messageContent = `
رزرو نوبت عکاسی جدید:
📅 تاریخ: ${values.date}
🕐 زمان: ${values.time}
📝 توضیحات: ${values.description || 'بدون توضیحات خاصی'}
        `.trim();


                    
        toast.success('رزرو شما با موفقیت ثبت شد');
        router.push('/');
        resetForm();
        
      } catch (error: any) {
        if (error.response?.status === 400) {
          toast.error('فرمت تاریخ نامعتبر است');
        } else if (error.response?.status === 422) {
          toast.error('اطلاعات وارد شده نامعتبر است');
        } else {
          toast.error('ثبت رزرو با خطا مواجه شد');
        }
        console.error('خطا:', error.response?.data || error.message);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto my-36 bg-white p-6 rounded-2xl shadow-[0px_0px_20px_10px_#edf2f7] w-full"
    >
      <h2 className="text-base sm:text-2xl font-semibold text-center mb-6">رزرو نوبت عکاسی</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className='relative'>
          <label className="mb-1 font-medium flex items-center gap-2 text-xs sm:text-sm">
            <Icon icon="stash:data-date" width="20" className="text-gray-600" /> تاریخ (شمسی)
          </label>
          <input
            type="text"
            name="date"
            placeholder="1403/05/06"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none text-xs sm:text-sm"
          />
          {formik.touched.date && formik.errors.date && (
            <div className="text-red-500 absolute top-3.5 bg-white px-2 left-5 text-xs mt-1">{formik.errors.date}</div>
          )}
        </div>
                
        <div className='relative'>
          <label className="mb-1 font-medium flex items-center gap-2 text-xs sm:text-sm">
            <Icon icon="formkit:time" width="20" className="text-gray-600" /> زمان (دقیقه و ساعت)
          </label>
          <input
            type="text"
            name="time"
            placeholder="14:30"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none text-xs sm:text-sm"
          />
          {formik.touched.time && formik.errors.time && (
            <div className="text-red-500 absolute top-3.5 bg-white px-2 left-5 text-xs mt-1">{formik.errors.time}</div>
          )}
        </div>
                
        <div className='relative'>
          <label className="mb-1 font-medium flex items-center gap-2 text-xs sm:text-sm">
            <Icon icon="iconamoon:edit-light" width="20" className="text-gray-600" /> توضیحات (اختیاری)
          </label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="هر توضیحی که دوست دارید بنویسید..."
            className="w-full border h-[100px] border-gray-300 p-2 rounded-lg focus:outline-none min-h-[45px] max-h-[300px] text-xs sm:text-sm"
          />
        </div>
                
        <motion.div whileTap={{ scale: 0.95 }}>
          <ButtonLink text='ارسال فرم رزرو' type='submit' />
        </motion.div>
      </form>
    </motion.div>
  );
}
