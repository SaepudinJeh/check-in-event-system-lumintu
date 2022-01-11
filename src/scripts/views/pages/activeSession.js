import GetData from '../../utils/getDataApi';
import { sessionTemplate } from '../templates/activeSession/activeSession';

const activeSession = {
  async render() {
    return `
      <section class="w-full">
        <div class="flex items-center w-full pb-8">
            <a href="/#/" class="pl-5">
                <span class="iconify text-5xl" data-icon="bi:arrow-left-short"></span>
            </a>
            <h1 class="mx-auto text-2xl"><b>Active Session</b></h1>
        </div>

        <div id="session" class="items-center w-full">
            
        </div>
      </section>
    `;
  },
  async afterRender() {
    const sessionIdElemenet = document.querySelector('#session');

    GetData('http://lumintu-tiket.tamiaindah.xyz:8055/items/session?&filter[day(start_time)][_eq]=03').then(result => {
        result.map(data => {
            sessionIdElemenet.innerHTML += sessionTemplate(data);
        })
    })
  }
};

export default activeSession;
