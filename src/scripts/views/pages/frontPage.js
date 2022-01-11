import GetData from '../../utils/getDataApi';

const FrontPage = {
  async render() {
    return `
      <section class="text-center">
        <a href="/" class="flex justify-center items-center mt-4">
          <div class="w-12 h-12">
            <img src="lumintu.svg">
          </div>
          <h1 class="title-heading ml-2 font-medium text-gray-800 sm:text-lg text-base" style="font-family: 'Pacifico', cursive;">
            Lumintu Event
          </h1>
        </a>

        <div class="grid gap-y-4 items-center w-full mt-10">

        <a href="/#/active-session" class="w-full h-full">
          <button name="button check in" class="w-full shadow-md bg-white rounded-2xl h-56 hover:shadow-lg text-gray-700">
              <span class="iconify mx-auto text-4xl" data-icon="iconoir:user-scan"></span>
              <span class="">Scan Peserta</span>
          </button>
        </a>

        <a href="/#/participants" class="w-full h-full">
          <button name="button check point" class="w-full shadow-md shadow-md bg-white rounded-2xl h-56 hover:shadow-lg text-gray-700">
              <span class="iconify mx-auto text-5xl" data-icon="ph:users-four-light"></span>
              <span class="">Participants</span>
          </button>
        </a>

        <!--<a href="/#/session" class="w-full h-full">
          <button name="button check point" class="w-full shadow-md shadow-md bg-white rounded-2xl h-36 hover:shadow-lg sm:text-yellow-800 text-gray-700">
              <span class="iconify mx-auto text-3xl" data-icon="bi:calendar2-check"></span>
              <span class="">Session</span>
          </button>
        </a>-->
        </div>

        <div class="flex justify-center items-center mt-14 text-xs text-gray-600">
          <p>
          © 2021 Lumintu Event |
          </p>
          <a href="/" class="font-bold text-yellow-800 ml-1">
            Lumintu Logic
          </a>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const sessionActiveElement = document.querySelector('#sessionActive');
    const checkedIn = document.querySelector('#CheckedIn');

    const sessionActive = (data) => `
      <div class="mt-7 w-full bg-white py-3 px-4 rounded-lg shadow-lg">
        <h1 class="font-bold">${data.session_type}</h1>
        <p>${data.session_desc}</p>
        <h2 class="font-bold text-lg">${data.session_speaker_name}</h2>
      </div>
    `;
    GetData(' https://api-ticket.arisukarno.xyz/items/registration?aggregate[countDistinct]=id_participant').then(result => {
        result.map(data => {
            sessionIdElemenet.innerHTML += sessionTemplate(data);
        })
    })


    Promise.all([
      GetData(' https://api-ticket.arisukarno.xyz/items/registration?aggregate[countDistinct]=id_participant'),
    ])
  },
};

export default FrontPage;
