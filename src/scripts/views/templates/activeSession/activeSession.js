import activeSession from "../../pages/activeSession";

const sessionTemplate = (data) => 
`

  <div style="visibility: " class="flex justify-center mx-auto rounded-xl mt-8 w-full">
    <a href="/#/scan/${data.session_id}" class="bg-white w-full py-2 rounded-md shadow-lg px-4">
        <div class="text-left mx-auto hover:bg-gray-100 pb-4 pt-2">
            <p class="text-xs md:text-base text-black leading-8">${data.start_time}</p>
            <p class="text-2xl md:text-xl font-bold text-gray-800 ">${data.session_type}</p>
            <p class="text-md md:text-base text-gray-900 leading-6">${data.session_desc}</p><br>
            <p class="text-xs md:text-base text-black">${data.session_speaker_name}</p>
        </div>
    </a>
  </div>
`
; 

export {
  sessionTemplate,
}
