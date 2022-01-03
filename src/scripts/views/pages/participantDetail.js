import UrlParser from '../../routes/urlParser';
import GetData from '../../utils/getDataApi';
import { participantName, participantId, description, registration, merchandise, buttonElement, checkStatusElement } from '../templates/participantDetail/participantTemplates';


const participantDetail = {
  async render() {
    return `
      <div class="spinner">
        <div class="progress-7"></div>
      </div>
      <section class="w-full mx-auto pb-40 bg-bottom ">

      <!-- Navigation -->
        <div class="flex items-center justify-between">
          <button onClick="window.history.back();" class="pl-5">
              <span class="iconify text-4xl" data-icon="bi:arrow-left-short"></span>
          </button>
          <h1 class="mx-auto font-semibold">Participant Detail</h1>
          <div></div>
        </div>
      <!-- Navigation -->

        <div class="box-border w-full bg-white mx-auto rounded-lg mt-10 mb-10 pb-5 md:px-7 px-4">
          <div class="flex items-center justify-between border-b-2 border-dashed">
            <div id="custumer">
            </div>

            <!--NOTIFY CHECKED-->
            <div id="check-status" class="rounded-lg">
                
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
                    <p class="text-gray-400 pt-4 font-medium text-xs">History Session</p>
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

    const idParticipant = id.split('-')[0];
    const idSession = id.split('-')[1];

    const historySession = (data) => `
      <p class="font-bold text-xs py-2">${ data.id_session }</p>
    `;

    Promise.all([
      GetData(`https://api-ticket.arisukarno.xyz/items/order?fields=customer_id.customer_id,customer_id.customer_name,ticket_id.ticket_id,ticket_id.ticket_type&filter[customer_id]=${idParticipant}`),
      // GetData(`https://api-ticket.arisukarno.xyz/items/registration?filter[id_participant]=${idParticipant}&aggregate[min]=validated_on`),
      // GetData(`https://api-ticket.arisukarno.xyz/items/customer_x_merch_eligible?fields=*,%20merch_eligible_id.merch_id.merch_name&filter[customer_x_merch_id][customer_id]=${idParticipant}`),
      // GetData(`https://api-ticket.arisukarno.xyz/items/registration?filter[id_participant]=${idParticipant}&aggregate[min]=validated_on`),
      // GetData(`https://api-ticket.arisukarno.xyz/items/registration?filter[id_participant]=${idParticipant}&filter[validated_on][_between]=[2020-01-1,2200-12-12]`),
    ]).then(async([res1]) => {
      res1.map((data) => {

        elementName.innerHTML = participantName(data);
        elementId.innerHTML = participantId(data);
        elementDesc.innerHTML = description(data);
      })

      // res2.map((data) => {
      //   validatedOn.innerHTML += registration(data);
      // });

      // res3.map((data) => {
      //   merchElement.innerHTML += merchandise(data)
      // });

      // res4.map(data => {

      //   const time = data.min.validated_on;

      //   let status = '';

      //   const time_validated = moment(time).format('L');
      //   const current_time = moment(new Date).format('L');
       
      //   if (time_validated == null) {
      //     status = 'Non Active';
      //     checkStatus.innerHTML = checkStatusElement(status)
      //     checkStatus.classList.add('bg-red-600');
      //   }

      //   if (time_validated > current_time) {
      //     status = 'Check In';
      //     checkStatus.innerHTML = checkStatusElement(status)
      //     checkStatus.classList.add('bg-green-500');
      //   }

       

      // });

      // res5.map((data) => {
      //   sessionHistoryElement.innerHTML += historySession(data);
      // })

      // buttonSubmit.innerHTML = buttonElement;

      spinnerElement.classList.add('hidden')
    }).catch((err) => {
      console.log(err)
    });


    buttonSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      GetData(`http://192.168.18.76:8002/items/registration?filter[id_participant]=${idParticipant}&filter[id_session]=${idSession}`).then( async (result) => {
        const id_session = result[0].id_registration;
        
        const payload = {
          "validated_on": new Date()
        }


        const response =  await fetch(`http://192.168.18.76:8002/items/registration/${id_session}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        console.log(response);

         window.location.replace('/#/scan/4');

      })
    })
  }
};

export default participantDetail;
