const elementParticipants = data =>`
  <tr>
    <td>${ data.customer_id.customer_name }</td>
    <td>${ data.customer_id.customer_id }</td>
    <td>
    <a href="/#/participant/${data.customer_id.customer_id}">
      <button class="bg-yellow-500 hover:bg-gray-700 text-white font-bold px-3 py-1 md:py-2 md:px-4 rounded-full my-2">
      Detail
    </button>
    </a>
    </td>
  </tr>`
;

export {
  elementParticipants
}