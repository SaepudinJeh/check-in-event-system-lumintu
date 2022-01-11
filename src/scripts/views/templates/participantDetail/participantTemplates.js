const statusActive = `
  <div class="py-1 px-3 bg-green-500 rounded-xl text-white text-sm font-medium">
    Active
  </div>
`;

const statusInactive = `
  <div class="py-1 px-3 bg-gray-400 rounded-xl text-white text-sm font-medium">
    Inactive
  </div>
`;

const participantName = (data) => `
  <div class="">
    <p class="text-gray-400 pt-4 font-medium text-xs">PARTICIPANT NAME</p>
    <p class="font-bold text-lg truncate">${data.customer_id.customer_name}</p>
  </div>
`;

const participantId = (data) => `
  <p class="text-gray-400 pt-4 font-medium text-xs">ID PARTICIPANT</p>
  <p class="font-bold text-md py-2">${data.customer_id.customer_id}</p>
`;

const description =(data) =>`
   <p class="text-gray-400 pt-4 font-medium text-xs">TICKET TYPE</p>
   <p class="font-bold text-md py-2">${data.ticket_id.ticket_type}</p>
`;

const registration = (data) => `
  <p class="text-gray-400 pt-4 font-medium text-xs">CHECK-IN TIME</p>
  <p class="font-bold text-md py-2">${ moment(data.min.validated_on).format('LLLL') }</p>
`;

const ticketType =(data) =>`
   <p class="text-gray-400 pt-4 font-medium text-xs">TICKET TYPE</p>
   <p class="font-bold text-md py-2">${data}</p>
`;

const merchandise = (data) => `
  <div class="form-check text-sm block">
    <input id="${data}" type="checkbox" value="${data}" name="${data}" id=${data}>
    <label class="form-check-label pl-2 font-medium" for="${data}">
        ${data}
    </label>
  </div>
`;

const historySession = (data) => `
  
  <p class="font-bold text-xs py-2 truncatte">
  ${data.id_seminar} - ${moment(data.validate_on).locale('id').calendar()}
  </p>
`;

const buttonElement = `
  <button type="submit" name="button check in" class="w-full mt-6 flex justify-center bg-yellow-400 text-white mx-auto py-2 rounded-md">
    Submit
  </button>
`;

const checkStatusElement = (data) => `
  <div class="py-1 px-2 text-center text-white text-xs">
    ${data}
  </div>
`;


export {
  participantName,
  historySession,
  participantId,
  description,
  registration,
  ticketType,
  merchandise,
  buttonElement,
  checkStatusElement,
  statusActive,
  statusInactive
};
