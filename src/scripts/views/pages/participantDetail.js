import UrlParser from '../../routes/urlParser';
import GetData from '../../utils/getDataApi';
import GetDataRegistration from '../../utils/getDataRegistration';
import { participantName, participantId, description, registration, merchandise, buttonElement, checkStatusElement, statusActive, statusInactive } from '../templates/participantDetail/participantTemplates';


const participantDetail = {
  async render() {
    return `
      <div class="spinner">
        <div class="progress-7"></div>
      </div>
      <section class="w-full mx-auto pb-40 bg-bottom ">

      <!-- Navigation -->
        <div class="flex items-center justify-between">
          <a href="/#/active-session" class="pl-5">
              <span class="iconify text-4xl" data-icon="bi:arrow-left-short"></span>
          </a>
          <h1 class="mx-auto font-semibold">Participant Detail</h1>
          <div></div>
        </div>
      <!-- Navigation -->

        <div class="box-border w-full bg-white mx-auto rounded-lg mt-10 mb-10 pb-5 md:px-7 px-4">
          <div class="flex items-center justify-between border-b-2 border-dashed">
            <div class="w-full">
              <div class="flex items-center justify-between w-full">
                <div id="custumer">

                </div>
              </div>
            </div>

            <!--NOTIFY CHECKED-->
            <div id="status">

            </div>
          </div>


          <!--GRID-->
            <div class="grid grid-cols-2 ">
                <!--LEFT-->
                <div>
                  <!--ID-->
                  <div id="participant">
                  </div>

                  <div id="ticket"></div>

                  <div id="session"></div>

                </div>

                <!-- RIGHT -->
                <div>
                  <!--CHECK-IN-->
                  <div id="registration">

                  </div>

                  <div id="session-history">
                    <p class="text-gray-400 pt-4 font-medium text-xs">REGISTRATION TIME</p>

                    <p class="regis-time text-xs mt-1 font-medium"></p>
                  </div>
                </div>
            </div>
          <!--GRID CLOSE-->

          <!--MERCHANDISE-->
          <form>
              <p class="text-gray-400 py-4 font-medium text-xs">MERCHANDISE</p>

              <div id="merch">

              </div>

              <!--BUTTON SUBMIT-->

              <div id="button-submit">

              </div>
          </form>
          <!--MERCHANDISE CLOSE-->
        </div>
      </section>
    `;
  },
  async afterRender() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const elementName = document.querySelector('#custumer');
    const elementId = document.querySelector('#participant');
    const elementDesc = document.querySelector('#ticket');
    const validatedOn = document.querySelector('#registration');
    const merchElement = document.querySelector('#merch');
    const buttonSubmit = document.querySelector('#button-submit');
    const checkStatus = document.querySelector('#check-status');
    const spinnerElement = document.querySelector('.spinner');
    const sessionHistoryElement = document.querySelector('#session-history');
    const statusCheckIn = document.querySelector('#status');
    const regisTime = document.querySelector('.regis-time');

    const idParticipant = id.split('-')[0];
    const idSession = id.split('-')[1];

    console.table([idParticipant, idSession])

    const historySession = (data) => `
      <p class="font-bold text-xs py-2">${ data.id_session }</p>
    `;

    Promise.all([
      GetData(`http://lumintu-tiket.tamiaindah.xyz:8055/items/order?fields=customer_id.customer_id,customer_id.customer_name,ticket_id.ticket_id,ticket_id.ticket_type&filter[customer_id]=${idParticipant}`),

      GetDataRegistration(`http://localhost:5000/v1/participant/${idParticipant}/seminar/${idSession}`)
    ]).then(async([res1, res2]) => {
      res1.map((data) => {

        elementName.innerHTML = participantName(data);
        elementId.innerHTML = participantId(data);
        elementDesc.innerHTML = description(data);
      })

      const validateCheckIn = res2.participant.validate_on

      // Check Status --------->
      if (validateCheckIn !== '' || null) {
        statusCheckIn.innerHTML += statusActive
        console.log(statusCheckIn)
        console.log('wkwkwk')
      } else {
        statusCheckIn.innerHTML += statusInactive
      }

      // Check Status <-------

      // Registration time

      regisTime.innerHTML = `${moment(res2.participant.create_at, 'Asia/Jakarta').format('LLLL')}`

      // Merch ------->
      const merchs = res2.merch.merch

      merchs.map(data => {
        merchElement.innerHTML += merchandise(data)
      })

      //  Merch <-------

      buttonSubmit.innerHTML = buttonElement;

      spinnerElement.classList.add('hidden')
    }).catch((err) => {
      console.log(err)
    });


    buttonSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const response =  await fetch(`http://localhost:5000/v1/participant/${idParticipant}/seminar/${idSession}`, {
        method: 'PATCH'
      })

      const response2 = await fetch(`http://localhost:5000/v1/${idParticipant}`)

      console.table([response, response2])

      window.location.replace('/#/active-session')

    })
  }
};

export default participantDetail;
