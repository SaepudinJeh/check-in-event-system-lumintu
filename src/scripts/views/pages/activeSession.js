import GetData from '../../utils/getDataApi';
import { sessionTemplate } from '../templates/activeSession/activeSession';

const activeSession = {
  async render() {
    return `
      <section class="w-full">
        <div class="flex items-center w-full">
            <a href="/#/">
                <span class="iconify text-4xl" data-icon="bi:arrow-left-short"></span>
            </a>
            <h1 class="mx-auto text-2xl"><b>Active Session</b></h1>
        </div>

        <div id="session" class="flex items-center w-full">
            
        </div>
      </section>
    `;
  },
  async afterRender() {
    const sessionIdElemenet = document.querySelector('#session');

    GetData(' https://api-ticket.arisukarno.xyz/items/session?&filter[day(start_time)][_eq]=03&filter[hour(start_time)][_eq]=17%27').then(result => {
        result.map(data => {
            sessionIdElemenet.innerHTML += sessionTemplate(data);
        })
    })
  }
};

export default activeSession;
