import React from "react";
import { useEffect } from "react";
import NavbarComponents from "./components/NavbarComponents";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//Functions
import { currentUser } from '../Services/auth'
//Redux
import { useDispatch } from "react-redux";

export default function HomeApp() {
  const features = [
    { name: "ผลิตภัณฑ์", description: "Yerba MaTe" },
    {
      name: "ส่วนประกอบที่สำคัญ",
      description:
        "ชามาเตแบบน้ำ 95% หญ้าหวานแทนน้ำตาล 5%",
    },
    { name: "ขนาดผลิตภัณฑ์", description: '3.5 cm. x 15 cm.' },
    {
      name: "ราคา",
      description: "แบบซอง 19 บาท แบบแพ๊ค 12 ซอง 219 บาท",
    },
    { name: "น้ำหนัก", description: "20 กรัม ต่อ ซอง" },
    {
      name: "สรรพคุณ",
      description:
        "ขับปัสสาวะ แก้อาการเมื่อยล้า ลดน้ำหนัก เพราะทำให้เบื่ออาหาร ในใบมาเต 100 กรัมมีคาเฟอีน 0.6 - 1.6 กรัม",
    },
  ];

  const callouts = [
    {
      name: "สินค้าทั้งหมด",
      description: "สินค้าทั้งหมด",
      imageSrc:
        "https://sv1.picz.in.th/images/2023/05/01/yEG5r9.jpg",
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "/products",
    },
    {
      name: "สินค้าแบบแพ๊ค",
      description: "ชามาเตแบบแพ๊ค 12 ซอง",
      imageSrc:
        "https://imgz.io/images/2023/05/01/3928113.jpeg",
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "/product/mate-bag",
    },
    {
      name: "สินค้าแบบซอง",
      description: "ชามาเตแบบซอง",
      imageSrc:
        "https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg",
      imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
      href: "/product/mate-bag-v2",
    },
  ];

  const people = [
    {
      name: "วิเชียร นาคทองอินทร์",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://sv1.picz.in.th/images/2023/05/01/yEGCU0.jpg",
    },
    {
      name: "สิทธิพัฒน์ คิดเห็น",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://sv1.picz.in.th/images/2023/05/01/yEJ0v2.jpg",
    }
  ];

  // const token = () => {
  //   const dipatch = useDispatch()
  //   const idtoken = localStorage.token
  //   if (idtoken) {
  //     currentUser(idtoken)
  //     .then(res => {
  //       dipatch({
  //         type: 'LOGIN',
  //         payload: {
  //           token: idtoken,
  //           email: res.data.user.email,
  //           role: res.data.user.role
  //         }
  //       })
  //       roleBaseRedirect(res.data.user.role)
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   }
  // }

  // useEffect(() => {
  //   token()
  // },[])
  
  const dipatch = useDispatch()
  const idtoken = localStorage.token
  if (idtoken) {
    currentUser(idtoken)
    .then(res => {
      console.log(res.data)
      dipatch({
        type: 'LOGIN',
        payload: {
          token: idtoken,
          email: res.data.user.email,
          role: res.data.user.role
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const navigate = useNavigate()
  const roleBaseRedirect = (role) => {
    if(role === 'admin'){
      navigate('/admin/index')
    }else {
      navigate('/')
    }
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarComponents />
      {/* Landing Page */}
      <div className="relative overflow-hidden bg-white">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-black sm:text-6xl">
                ใหม่
              </h1>
              <h2 className="font text-4xl font-bold tracking-tight text-amber-500 sm:text-6xl">
                แบบซองพกพาสะดวก
              </h2>
              <p className="mt-4 text-xl text-neutral-500 font-medium">
                ใบนำมาทำเครื่องดื่มที่เรียกว่ามาเตโดยนำใบและกิ่งไปอบในน้ำร้อนแบบเดียวกับการชงน้ำชาจากต้นชา
                มาเตมีสีเขียวอ่อน กลิ่นหอมฉุน มีสรรพคุณขับปัสสาวะ
                แก้อาการเมื่อยล้า ในยุโรปนิยมดื่มเป็นเครื่องเพื่อ ลดน้ำหนัก
                เพราะทำให้เบื่ออาหาร ในใบมาเต 100 กรัมมีคาเฟอีน 0.6 - 1.6 กรัม
                กลิ่นหอมของใบจะด่างไปตามอายุโดยจะหอมที่สุดเมื่อผลใกล้สุก
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://imgz.io/images/2023/05/01/3928113.jpeg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://sv1.picz.in.th/images/2023/05/01/yE2IEn.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://p2crires.cri.cn/yafei/p2/M00/2F/5B/CqgNOlzt9ISATc-lAAAAAAAAAAA379.2045x1363.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.thestatesman.com/wp-content/uploads/2019/06/TEA-TREE-OIL.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://sv1.picz.in.th/images/2023/05/01/yE2vuv.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://publish.purewow.net/wp-content/uploads/sites/2/2018/08/what-is-yerba-mate.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/products"
                  className="inline-block rounded-md border border-transparent bg-amber-500 py-3 px-8 text-center font-medium text-white hover:bg-neutral-900"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout 2 */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ผลิตภัณฑ์ ชามาเต สูตรน้ำแบบซอง
          </h2>
          <p className="mt-4 text-gray-500">
            ผลิตภัณฑ์ ชามาเต สูตรน้ำแบบซองใน 1 ซองประกอบด้วย ชามาเตแบบน้ำสูตรเข้มข้นสามารถดื่มได้ทันทีจะได้ความสดชื่นและความตื่นตัวที่เข้มข้นหรือผสมน้ำเปล่าใส่น้ำแข็งจะได้
            ความเข้มข้นที่อ่อนๆเน้นความสดชื่น หรือ ผสมนมจะได้ความอร่อยที่ลงตัวสำหรับคนที่เน้นว่าอร่อยแต่ยังได้ความสดชื่น
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://imgz.io/images/2023/05/01/3928113.jpeg"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://imgz.io/images/2023/05/01/3928113.jpeg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>

      {/* Layout 3 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">รายการสินค้า</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                Yerba Mate คือผลผลิตจากธรรมชาติที่เปี่ยมไปด้วย วิตามิน,แร่ธาตุสำคัญ, กรดอมิโนที่ดีต่อร่างกาย , อุดมไปด้วยสารต้านอนุมูลอิสระ.  
                สถาบันปาสเตอร์และสมาคมวิทยาศาสตร์ปารีสในปี 1964 ได้ข้อสรุปว่า “มันยากมากที่จะหาพืชสมุนไพรใดๆในโลกที่มีคุณค่าทางโภชนาการสูงไปกว่า Yerba Mate ” 
                แถม yerba mate ยังเปี่ยมไปด้วย “วิตามินที่สำคัญในการดำรงชีวิตของมนุษย์”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://sv1.picz.in.th/images/2023/05/01/yEGCU0.jpg"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">วิเชียร นาคทองอินทร์</div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">CEO of Workcation</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ประธานกรรมการบริหาร
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              มหาวิทยาลัยธุรกิจบัณฑิตย์ วิทยาลัยนวัตกรรมด้านเทคโนโลยีและวิศวกรรมศาสตร์ (College of Innovative Technology and Engineering : CITE) สาขาวิศวกรรมคอมพิวเตอร์
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-amber-500">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
