import GetData from '../../utils/getDataApi';

const sessionPage = {
  async render() {
    return `
      <section class="mx-auto w-full">
          <!-- navigation back -->
          <div class="flex items-center justify-between">
            <button>
              <a href="#">
                <span class="iconify text-4xl" data-icon="bi:arrow-left-short"></span>
              </a>
            </button>

            <h1 class="text-center font-bold">Event Dashboard</h1>
            <div></div>
          </div>

           <div class="flex items-center justify-center mt-3">
               <h2 class="font-bold">Active Now : </h2>
               <p class="font-bold text-blue-900 ml-2"> 329</p>
           </div>
          <!-- navigation back -->


          <!--GRID-->
          <div id="day"class="grid grid-cols-3 text-center gap-x-2"></div>

          <div id="sessionActive"></div>

       </section>
    `;
  },
  async afterRender() {
    const dayElement = document.querySelector('#day');
    const sessionActiveElement = document.querySelector('#sessionActive');

    const day =(data) =>`
    <button class="button-day">
        <div class="relative bg-white hover:bg-yellow-100 mx-auto rounded-xl mt-10  text-gray-800 py-4 px-2 text-sm truncate">
            <p class="font-bold">${data.day_name}</p>
            <p class="truncate text-xs">${data.day_desc}</p>
            <p class="text-xs">${data.day_date}</p>
        </div>
    </button>
    `;

    const sessionActive = (data) => `
      <div class="mt-7 w-full bg-white py-3 px-4 rounded-lg shadow-lg">
        <h1 class="font-bold">${data.session_type}</h1>
        <p>${data.session_desc}</p>
        <h2 class="font-bold text-lg">${data.session_speaker_name}</h2>
      </div>
    `;


    Promise.all([
      GetData('http://192.168.18.76:8001/items/day'),
      GetData('http://192.168.18.76:8002/items/registration?aggregate[countDistinct]=id_participant&filter[validated_on][_between]=[2020-01-1,2200-12-12]'),
    ]).then(async([res1, res2]) => {
      res1.map((data) => {
        dayElement.innerHTML += day(data)
      })

      res2.map((data) => {
        console.log(data);
      })
    }).then(() => {
      const buttonDay = document.querySelectorAll('.button-day');
      // console.log(buttonDay.length)

      buttonDay[0].addEventListener('click', () => {
        GetData('http://192.168.18.76:8001/items/session?filter[day(start_time)][_eq]=01').then((result) => {
          result.map((data) => {
            sessionActiveElement.innerHTML += sessionActive(data)
          })
        })
      });

      buttonDay[1].addEventListener('click', () => {
        GetData('http://192.168.18.76:8001/items/session?filter[day(start_time)][_eq]=03').then((result) => {
          result.map((data) => {
            sessionActiveElement.innerHTML += sessionActive(data)
          })
        })
      })

      buttonDay[2].addEventListener('click', () => {
        GetData('http://192.168.18.76:8001/items/session?filter[day(start_time)][_eq]=05').then((result) => {
          result.map((data) => {
            sessionActiveElement.innerHTML += sessionActive(data)
          })
        })
      })


    }).catch((error) => {
      console.log(error);
    })
  }
};

export default sessionPage;
