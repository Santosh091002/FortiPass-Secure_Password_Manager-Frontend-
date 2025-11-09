import { useRef, useState, useEffect } from "react";
import eye from "../Images/eye.png";
import eyecross from "../Images/eyecross.png";
import copy from "../Images/copy.png";
import safe from "../Images/safe-box.png";
import edit from "../Images/edit.png";
import trash from "../Images/trash.png";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setpasswordarray] = useState([]);

  useEffect(() => {
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    if (passwords) {
      setpasswordarray(passwords);
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes(eyecross)) {
      ref.current.src = eye;
      passwordRef.current.type = "password";
    } else {
      ref.current.src = eyecross;
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
    toast("Fields cannot be empty!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
    }

    toast("Password Saved!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setpasswordarray([...passwordarray, {...form, id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordarray, {...form, id:uuidv4()}]));
    setform({ site: "", username: "", password: "" })
  };

  const deletePassword = (id) => {
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    let cnf = confirm("Do you really want to delete this password?")
    if(cnf){
      setpasswordarray(passwordarray.filter(item =>item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item =>item.id !== id)));
    }
  };

  const editPassword = (id) => {
    console.log("Editing Password with id :",id)
    setform(passwordarray.filter(item => item.id === id)[0])
    setpasswordarray(passwordarray.filter(item =>item.id !== id));
  };

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex justify-center flex-col gap-4 items-center mt-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#F5F5F5_40%,#289F4C_100%)]"></div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl md:text-3xl">
          <span className="text-[#289F4C]">&lt;</span>
          <span className="text-[#2C3E50]">Forti</span>
          <span className="text-[#289F4C]">Pass/</span>
          <span className="text-[#289F4C]">&gt;</span>
        </h1>
        <p className="text-sm md:text-lg text-[#2C3E50]">Your own password manager</p>
      </div>
      <div className="bg-white rounded-xl shadow-xl border-t-4 border-[#289F4C] border-b-4  flex flex-col justify-evenly items-center min-h-[16rem] w-[90%] md:w-[65%]">
        <div className="text-[#2C3E50] flex flex-col gap-8 w-[95%] items-center">
          <input
            type="text"
            placeholder="Website URL"
            className=" w-[90%] md:w-[80%] input"
            name="site"
            value={form.site}
            required
            onChange={handleChange}
          />
          <div className="flex justify-between w-[90%] md:w-[80%]">
            <input
              placeholder="Username"
              type="text"
              className="input w-[55%] md:w-[60%]"
              name="username"
              value={form.username}
              required
              onChange={handleChange}
            />
            <div className="relative w-[40%] md:w-[30%] ">
              <input
                ref={passwordRef}
                placeholder="Password"
                type="password"
                className="input w-full "
                name="password"
                value={form.password}
                required
                onChange={handleChange}
              />
              <span className="absolute right-2 top-1">
                <img
                  ref={ref}
                  className="w-[1.4rem] cursor-pointer"
                  src={eye}
                  alt="eye"
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          <button
            className="transition duration-200 bg-gradient-to-r from-[#E0E0E0] to-[#C8E6C9] text-[#2C3E50] hover:bg-gradient-to-r hover:from-[#289F4C] hover:to-[#38A852] hover:text-white py-2 px-4 md:py-1 md:px-3 flex items-center justify-center active:scale-96 hover:cursor-pointer rounded-3xl md:rounded-2xl gap-1 border-1 font-bold"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="loop-on-hover"
              delay="100"
              className=" w-6 h-6 md:w-5 md:h-5"
            ></lord-icon>
            Save
          </button>
        </div>
      </div>
      <div className="passwords w-[90%] md:w-[65%] flex items-center  flex-col px-2 bg-white rounded-2xl border-[#289F4C] border-t-4 max-h-[50vh] py-4 shadow-xl">
        <h2 className=" text-lg md:text-xl font-bold text-[#2C3E50] mb-4 flex items-center justify-center gap-1">
          FortiPass Vault
          <img src={safe} style={{ width: "1.3rem" }} alt="safe.png" />
        </h2>
        {passwordarray.length === 0 && (
          <div className="font-bold text-[#2C3E50] text-md">
            &lt;Vault is Empty&gt;
          </div>
        )}
        {passwordarray.length !== 0 && (
          <div className="w-full max-h-[16vh] md:max-h-[15vh] overflow-y-auto hide-scrollbar rounded-lg overflow-x-auto">
            <table className="table-fixed w-full ">
              <thead className="bg-[#289F4C] text-white sticky top-0">
                <tr>
                  <th className="text-center p-2 ">Website</th>
                  <th className="text-center p-2 ">Username</th>
                  <th className="text-center p-2 ">Passwords</th>
                  <th className="text-center p-2 ">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordarray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-left p-1 border-white border-r-1 w-[30%] truncate ">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={item.site}
                            target="_blank"
                            className="hover:text-blue-500"
                          >
                            {item.site}
                          </a>
                          <div
                            className="copybtn hover:cursor-pointer hover:scale-110 active:scale-100 transition ease-in-out delay-50"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img
                              className="w-3 md:w-4"
                              src={copy}
                              alt="copy.png"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-1 border-white border-r-1 w-[30%] truncate">
                        <div className="flex items-center justify-center gap-2">
                          {item.username}
                          <div
                            className="copybtn hover:cursor-pointer hover:scale-110 active:scale-100 transition ease-in-out delay-50"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img
                              className="w-3 md:w-4"
                              src={copy}
                              alt="copy.png"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-1 truncate">
                        <div className="flex items-center justify-center gap-2">
                          {item.password}
                          <div
                            className="copybtn hover:cursor-pointer hover:scale-110 active:scale-100 transition ease-in-out delay-50"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img
                              className="w-3 md:w-4"
                              src={copy}
                              alt="copy.png"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-1 ">
                        <div className="flex items-center justify-center gap-2 md:gap-4">
                          <button
                            title="Edit Login"
                            className=" p-1 rounded-full hover:scale-110 active:scale-100 transition ease-in-out"
                            onClick={()=>{editPassword(item.id)}}
                          >
                            <img
                              src={edit}
                              alt="Edit"
                              className=" w-3 md:w-4 cursor-pointer"
                            />
                          </button>

                          <button
                            title="Delete Login"
                            className=" p-1 rounded-full hover:scale-110 active:scale-100 transition ease-in-out"
                            onClick={()=>{deletePassword(item.id)}}
                          >
                            <img
                              src={trash}
                              alt="Delete"
                              className="w-3 md:w-4 cursor-pointer"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
