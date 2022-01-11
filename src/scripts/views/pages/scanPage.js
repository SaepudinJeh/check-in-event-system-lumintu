import UrlParser from '../../routes/urlParser';
import { sources, swal } from '../../views/dist/sweetalert2.all';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { participantId } from '../templates/participantDetail/participantTemplates';
import getData from '../../utils/getDataApi';

const scanPage = {
  async render() {
    return `
      <section class="mx-auto w-full">
        <div class="flex items-center">
          <button>
            <a href="/#/">
              <span class="iconify text-4xl" data-icon="bi:arrow-left-short"></span>
            </a>
          </button>
          <h1 class="text-xl font-semibold mx-auto" style="font-family: 'Montserrat', sans-serif;">QR Scan</h1>
        </div>

        <!-- qr scan -->
          <div class="mt-12 bg-white sm:w-10/12 mx-auto rounded-xl">
            <div id="preview" class="rounded-xl w-full mx-auto text-sm rounded-lg overflow-hidden bg-white"></div>
          </div>

         <div class="mt-8">
            <form class="bg-white flex items-center rounded-xl shadow-xl mx-auto">
                <input id="id-code" class="rounded-xl w-full py-1 px-6 text-gray-700 leading-tight focus:outline-none" id="cam-qr-result" type="text" placeholder="Search Your Participant ID">
              <div class="p-4">
                <button id="buttonForm" type="submit" class="text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                  <span class="iconify text-2xl text-gray-700" data-icon="bx:bx-search-alt"></span>
                </button>
              </div>
            </form>
         </div>

      </section>
    `;
  },

  async afterRender() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();


    async function onScanSuccess(decodedText, decodedResult) {
      

      fetch(`https://register.ulin-app.xyz/v1/participant/15/seminar/4`, {
        method: 'PATCH'
      }).then(result => {
        if(participantId == $(`data`)){
          Swal.fire({
            position: 'center',
            icon:'success',
            title: 'Check-In Success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.replace(`/#/participant/${decodedText}-${id}`)
            location.reload()
            return
          })
        }
      })

      // function onScanSuccess(decodedText) {
      //   fetch(`https://register.ulin-app.xyz/v1/participant/15/seminar/4`, {
      //   method: 'PATCH'
      // }) .then(result => ({
      //   if(participantId  == '' || null){
      //     Swal.fire({
      //       position: 'center',
      //       icon:'success',
      //       title: 'Check-In Success',
      //       showConfirmButton: false,
      //       timer: 1500
      //     }).then(() => {
      //       location.replace(`/#/participant/${decodedText}-${id}`)
      //       location.reload()
      //       return
      //     })
      //   }
      // }))
      // }
      //});

      // Promise.all([
      //   GetData(`https://register.ulin-app.xyz/v1/participant/15/seminar/4`)
      // ]).then(async([res1, res2]) => {
      //   res1.map((data) => {
  
      //     Swal.fire({
      //           position: 'center',
      //           icon: 'success',
      //           title: 'Check-In Success',
      //           showConfirmButton: false,
      //           timer: 1500
      //         }).then(() => {
      //               location.replace(`/#/participant/${decodedText}-${id}`);
      //               location.reload()
      //               return
      //           })
      //          })
      //   })
      // });


      //POP UP SCAN STATUS
      // if (validateCheckIn !== '' || null) {
        // statusCheckIn.innerHTML += statusActive
        // console.log(statusCheckIn)
        // console.log('wkwkwk')
      //   Swal.fire({
      //         position: 'center',
      //         icon: 'success',
      //         title: 'Check-In Success',
      //         showConfirmButton: false,
      //         timer: 1500
      //       }).then(() => {
      //             location.replace(`/#/participant/${decodedText}-${id}`);
      //             location.reload()
      //             return
      //         })
      // } else {
      //   statusCheckIn.innerHTML += statusInactive
      // }
      // fetch(`https://register.ulin-app.xyz/v1/participant/15/seminar/4`, {
      //   method: 'PATCH'
      // }).then(result => {
      //   Swal.fire({
      //     position: 'center',
      //     icon: 'success',
      //     title: 'Check-In Success',
      //     showConfirmButton: false,
      //     timer: 1500
      //   }).then(() => {
      //         location.replace(`/#/participant/${decodedText}-${id}`);
      //         location.reload()
      //         return
      //     })
      //    })
      // handle the scanned code as you like, for example;
      // location.replace(`/#/participant/${decodedText}-${id}`);
      
      return
    }

    async function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "preview", { fps: 10, qrbox: 200 }, /* verbose= */ false);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    const buttonSubmit = document.querySelector('#buttonForm');

    buttonSubmit.addEventListener('click', () => {
      const getValue = document.querySelector('#id-code').value;

      console.log(getValue);

      if (getValue === '') {
        return;
      } else {
        window.location.replace(`/#/participant/${getValue}`);
      }

      document.querySelector('#id-code').value = '';
    })

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices.getUserMedia({video: true})) {
      console.log("Let's get this party started")
    }

  }
};

export default scanPage;
