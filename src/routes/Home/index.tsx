import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next"
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs'
import { toast } from 'react-toastify';
import { sendWaitListEmail } from '~/api'
import {useState} from 'react';

const Home = () => {


  const [fetching, setFetching] = useState(false);

  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  }

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async(data: any) => {

    if(fetching) return

    let did = await getFingerprint();
    setFetching(true);
    let [err, res] = await sendWaitListEmail({
      email: data.email,
      did: did
    });
    console.log(err, res);

    setFetching(false);

    if (err) {
      toast.error(t('common_fetch_error'));
      return;
    }

    // @ts-ignore
    if (res){
      if(res.code === 0){
        toast.success(t('join_waitlist_success'))
      }else{
        toast.error(res.msg)
      }
    }

    reset();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 语言切换按钮 - 添加在右上角 */}
      <div className="absolute top-4 right-6 z-10">
        <button
          onClick={toggleLanguage}
          className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition duration-200"
        >
          {i18n.language === 'zh' ? 'English' : '中文'}
        </button>
      </div>

      {/* 主内容区域 - 使用 flex-grow 确保它占据所有可用空间 */}
      <main className="flex-grow">
        <div className="h-full">
          <div className="relative isolate px-6 pt-14 lg:px-8 h-full">
            {/* 背景装饰元素 - 调整位置与z-index */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>

            {/* 主要内容区域 - 使用 flex 并设置最小高度 */}
            <div className="container mx-auto px-6 py-4 flex flex-col min-h-[calc(100vh-160px)] justify-center">
              {/* 英雄区域 */}
              <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
                {/* 左侧文本区域 */}
                <div className="flex flex-col items-start w-full lg:w-1/2 space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">{t('home_title')}</h1>
                  <h2 className="text-4xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      {t('home_subtitle')}
                    </span>
                    <br />
                    <span>{t('home_opensource')}</span>
                  </h2>

                  <p className="text-xl text-gray-600 max-w-2xl">
                    {t('home_description')}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="join">
                        <div>
                          <label className="input validator join-item">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                            <input {...register("email")} type="email" placeholder="mail@site.com" required />
                          </label>
                          <div className="validator-hint hidden">{t('form_validator_email')}</div>
                        </div>
                        <button className="btn btn-neutral join-item">
                          {
                            fetching ? <><span className="loading loading-spinner"></span> {t('common_loading')}</> : <>{t('join_waitlist')}</>
                          }
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button className="btn btn-neutral btn-xl" disabled={true}>
                      {t('home_try_now')}
                    </button>

                    <a
                      href="https://github.com/zwlcoding/mind-link"
                      className="btn btn-soft btn-xl"
                    >
                      <svg
                        className="h-5 w-5 fill-current mr-2"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      {t('home_github_source')}
                    </a>
                  </div>



                  {/* 添加特性指标 */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-indigo-600">100%</span>
                      <span className="text-gray-600">{t('feature_opensource')}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-indigo-600">{t('feature_privacy')}</span>
                      <span className="text-gray-600">{t('feature_privacy_desc')}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-indigo-600">{t('feature_rag')}</span>
                      <span className="text-gray-600">{t('feature_rag_desc')}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-indigo-600">{t('feature_mcp')}</span>
                      <span className="text-gray-600">{t('feature_mcp_desc')}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-indigo-600">{t('feature_online')}</span>
                      <span className="text-gray-600">{t('feature_online_desc')}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-indigo-600">{t('feature_compatible')}</span>
                      <span className="text-gray-600">{t('feature_compatible_desc')}</span>
                    </div>
                  </div>
                </div>

                {/* 右侧图片区域 */}
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur-lg opacity-30"></div>
                    <div className="relative rounded-lg shadow-xl overflow-hidden">
                      <img
                        src="/assets/banner.png"
                        alt="Mind Link Preview"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部装饰元素 - 调整定位和大小 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 - 始终固定在底部 */}
      <footer className="mt-auto">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <img src="/assets/logo-mini.png" alt="Mind Link Logo" className="h-6 w-auto mr-2" />
              <span className="text-gray-600 text-sm">
                {t('footer_copyright', { year: new Date().getFullYear() })}
              </span>
            </div>

            <div className="flex items-center space-x-6">
              {/* <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition duration-200">文档</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition duration-200">关于</a> */}
              <a
                href="https://github.com/zwlcoding/mind-link"
                className="text-gray-500 hover:text-indigo-600 transition duration-200 flex items-center"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;
