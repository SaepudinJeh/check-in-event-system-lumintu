import UrlParser from '../../routes/urlParser';
import GetData from '../../utils/getDataApi';
import GetDataRegistration from '../../utils/getDataRegistration';
import { participantName, participantId, ticketType, registration, merchandise, buttonElement, checkStatusElement, historySession, statusActive, statusInactive } from '../templates/participantDetail/participantTemplates';


const participantDetailFromList = {
  async render() {
    return `
      <div class="spinner">
        <div class="progress-7"></div>
      </div>
      <section class="w-full mx-auto bg-bottom ">

      <!-- Navigation -->
        <div class="flex items-center justify-between">
          <a href="/#/participants" class="pl-5">
              <span class="iconify text-5xl" data-icon="bi:arrow-left-short"></span>
          </a>
          <h1 class="mx-auto text-2xl"><b>Participant Detail</b></h1>
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
                  <div>
                    <div id="participant">
                    </div>
                  </div>

                  <div>
                    <div id="ticket">
                    </div>
                  </div>

                  <div id="registration">

                  </div>


                  <div id="session"></div>

                </div>
            </div>
          <!--GRID CLOSE-->

          <!--MERCHANDISE-->
          <form>
              <p class="text-gray-400 py-4 font-medium text-xs">MERCHANDISE</p>

              <div id="merch">

              </div>

              <div id="session-history">
              <p class="text-gray-400 pt-4 font-medium text-xs">HISTORY</p>
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
    const elementTicketType = document.querySelector('#ticket');
    const merchElement = document.querySelector('#merch');
    const buttonSubmit = document.querySelector('#button-submit');
    const spinnerElement = document.querySelector('.spinner');
    const checkStatus = document.querySelector('#check-status');
    const statusCheckIn = document.querySelector('#status');
    const regisTime = document.querySelector('.regis-time');
    const checkTime = document.querySelector('.checkin');
    const HistoryElement = document.querySelector('#session-history');

    const idParticipant = id.split('-')[0];
    const idSession = id.split('-')[1];

    Promise.all([
      GetData(`http://lumintu-tiket.tamiaindah.xyz:8055/items/order?fields=customer_id.customer_id,customer_id.customer_name,ticket_id.ticket_id,ticket_id.ticket_type&filter[customer_id]=${idParticipant}`),
      GetDataRegistration(`https://register.ulin-app.xyz/v1/merch/${idParticipant}`),
      GetDataRegistration(`https://register.ulin-app.xyz/v1/participant/${idParticipant}`)
    ]).then(async([res1, res2, res3]) => {
      res1.map((data) => {

        elementName.innerHTML = participantName(data);
        elementId.innerHTML = participantId(data);
      })

      const id_seminar = new Array() 

      //SESSION HISTORY
      res3.map(data => {
        id_seminar.push(data.id_seminar)


        if(data.validate_on !== '' || null){
          HistoryElement.innerHTML += historySession(data)
        }else{
          HistoryElement.innerHTML = "<p>-</p>"
        }
      })

      GetDataRegistration(`https://register.ulin-app.xyz/v1/participant/${idParticipant}/seminar/${id_seminar[0]}`).then((data) => {
        const merch = data.merch
          merch.map(data => {
            merchElement.innerHTML += merchandise(data)
          })


        const listMerchApi = res2.merchandise

        if (listMerchApi.length !== 0 || null){
            listMerchApi.map(data => {
            document.getElementById(data).checked = true;
            document.getElementById(data).disable = true;
            })
        }
    
      })
     

      buttonSubmit.innerHTML = buttonElement;

      spinnerElement.classList.add('hidden')



      buttonSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
  
        // Form list merch checkbox
        const itemForm = document.getElementById('merch');
        const checkBoxes = itemForm.querySelectorAll('input[type="checkbox"]');
  
        const merchandise = new Array()
  
        checkBoxes.forEach(data => {
          if (data.checked) {
            merchandise.push(data.value)
          }
        })
  
        const updateMerch =  await fetch(`https://register.ulin-app.xyz/v1/merch/${idParticipant}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(merchandise)
        })
  
        if (updateMerch.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload()
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Your work cant be saved',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload()
          })
        }
  
  
      })
    }).catch((err) => {
      console.log(err)
    });
  }
};

export default participantDetailFromList;
