export  function setAuthCookieAndContext(email, token, id, setContext){
    document.cookie = `email = ${email}`; 
    document.cookie = `token = ${token}`;
    document.cookie = `id = ${id}`
    const initialValue = {};
    const userInfo = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: value}), initialValue);
    setContext({email: userInfo.email, token: userInfo.token, id: userInfo.id});
 }