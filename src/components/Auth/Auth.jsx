import {useState} from 'react';
import styles from './Auth.module.css';
import gsap from 'gsap';

const Login = () => {

    const [mode, setMode] = useState('Sign in');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Отправка запроса на авторизацию
    };

    const switchMode = async () => {
        gsap.to([`.${styles.formContainer}`, `#${styles['switchModeButton']}`], {
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.8
        });
        gsap.to(`.${styles.switchButtonLogo}`, {
            opacity: 1,
            filter: 'none',
            duration: 0.8
        });
        await gsap.to(`.${styles.switchModeContainer}`, {
            width: '100%',
            borderRadius: '24px',
            duration: 0.8,
            ease: 'easeInOutCubic'
        });
        if (mode === 'Sign in') {
            await setMode('Sign up');
        } else {
            await setMode('Sign in');
        }
        setTimeout(async () => {
            await new function () {
                gsap.to([`.${styles.formContainer}`, `#${styles['switchModeButton']}`], {
                    opacity: 1,
                    filter: 'none',
                    duration: 0.8
                });
                gsap.to(`.${styles.switchModeContainer}`, {
                    width: '34%',
                    borderRadius: '0 24px 24px 0',
                    duration: 0.8,
                    ease: 'easeInOutCubic'
                });
                gsap.to(`.${styles.switchButtonLogo}`, {
                    opacity: 0,
                    filter: 'blur(6px)',
                    duration: 0.6
                });
            };
        }, 500);
    };

    const renderLogin = () => {
        switch (mode) {
            case 'Sign in':
                return (
                    <>
                        <div className={styles.formContainer}>
                            <h1>Sign in to <img src={'./public/LogoBG.svg'} alt={'logo'}/></h1>
                            <form className={styles.signInForm} onSubmit={handleSubmit}>
                                <input className={styles.signInFormInput} type="text" name={'email'} value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder={'Email'}/>
                                <input className={styles.signInFormInput} type="password" name={'password'}
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       placeholder={'Password'}/>
                                <div className={styles.rememberMe}>
                                    <input className={styles.rememberMeCheckbox} type={'checkbox'}/>
                                    <div>Remember me</div>
                                </div>
                                <button type={'submit'}>Sign in</button>
                            </form>
                            <p>or continue with</p>
                            <div className={styles.foreignAuthBlock}>
                                <button><img src="/public/Google.svg" alt="Auth with Google"/></button>
                                <button><img src="/public/Apple.svg" alt="Auth with GitHub"/></button>
                                <button><img src="/public/GitHub.svg" alt="Auth with Apple"/></button>
                            </div>
                            <a href="#">Forgot your password?</a>
                        </div>
                        <div className={styles.switchModeContainer}>
                            <button className={styles.switchModeButton} onClick={() => switchMode()}>
                                <div id={styles['switchModeButton']}>Sign Up</div>
                                <img className={styles.switchButtonLogo} src="/public/LogoSimple.svg" alt="Nota Logo"/>
                            </button>
                        </div>
                    </>
                );
            case 'Sign up':
                return (
                    <>
                        <div className={styles.formContainer}>
                            <h1>Create account</h1>
                            <div className={styles.foreignAuthBlock}>
                                <button><img src="/public/Google.svg" alt="Auth with Google"/></button>
                                <button><img src="/public/Apple.svg" alt="Auth with GitHub"/></button>
                                <button><img src="/public/GitHub.svg" alt="Auth with Apple"/></button>
                            </div>
                            <p>or use your email for registration</p>
                            <form className={styles.signInForm} onSubmit={handleSubmit}>
                                <input className={styles.signInFormInput} type="text" name={'name'} value={name}
                                       onChange={e => setName(e.target.value)}
                                       placeholder={'Name'}/>
                                <input className={styles.signInFormInput} type="email" name={'email'} value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       placeholder={'Email'}/>
                                <input className={styles.signInFormInput} type="password" name={'password'}
                                       onChange={e => setPassword(e.target.value)}
                                       value={password}
                                       placeholder={'Password'}/>
                                <div className={styles.terms}>
                                    <input className={styles.termsCheckbox} type={'checkbox'}/>
                                    <div>I have read the <a href="#">Term & Conditions</a></div>
                                </div>
                                <button type={'submit'}>Sign up</button>
                            </form>
                        </div>
                        <div className={styles.switchModeContainer}>
                            <button className={styles.switchModeButton} onClick={() => switchMode()}>
                                <div id={styles['switchModeButton']}>Sign In</div>
                                <img className={styles.switchButtonLogo} src="/public/LogoSimple.svg" alt="Nota Logo"/>
                            </button>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className={styles.AuthBody}>
            <div className={styles.container}>
                {renderLogin()}
            </div>
        </div>
    );
};

export default Login;