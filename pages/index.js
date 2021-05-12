import React from 'react';
import styles from '../src/styles/pages/Login.module.css';
import { useRouter } from 'next/router';
import user from '../src/services/user';


export default function Home() {

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);

  const router = useRouter();

  function validate() {
    if (user.login(name, password)) {
      setIsValid(true);
      localStorage.setItem("user", name);
      setTimeout(() => {
        router.push('/home')
      }, 2000)
    } else {
      setIsInvalid(true);
      setName('');
      setPassword('');
    }
  }

  return (
    <div className={styles.background}>

      <h1>D &bull; R &bull; A &bull; G &bull; O &bull; D &bull; E &bull; X</h1>

      <div className={styles.container}>

        {isValid ? (
          <div className={styles.spinning}>
            <img
              src="/dragonlogo blue.png"
              alt="logo dragao azul"
            />
            <h6>Carregando...</h6>
          </div>
        ) : (
          <div>
            <strong>Entrar</strong>

            <form
              className={styles.inputForm}
              onSubmit={(e) => {
                e.preventDefault();
                validate();
              }}
            >
              <input
                name="Username"
                placeholder="Email"
                onChange={(e) => {
                  setName(e.target.value);
                  setIsInvalid(false);
                }}
                value={name}
                style={
                  isInvalid ?
                    { borderBottom: "rgb(250, 106, 106) 2px solid" } :
                    { borderBottom: "#299eec 2px solid" }
                }
              />
              <input
                name="Password"
                type="password"
                placeholder="Senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsInvalid(false);
                }}
                value={password}
                style={
                  isInvalid ?
                    { borderBottom: "rgb(250, 106, 106) 2px solid" } :
                    { borderBottom: "#299eec 2px solid" }
                }
              />
              <button
                type="submit"
                disabled={name.length === 0 || password.length === 0}
              >Entrar</button>
            </form>

            {isInvalid && <p>Usuário ou senha inválido.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
