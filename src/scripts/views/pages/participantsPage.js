const participantPage = {
  async render() {
    return `
        <section class="mx-auto">
          <div class="flex items-center justify-between pt-2">
            <button>
              <a href="/#/" class="pl-5">
                <span class="iconify text-5xl" data-icon="bi:arrow-left-short"></span>
              </a>
            </button>
            <h1 class="text-center font-bold text-4xl">List Participants</h1>
            <div></div>
          </div>

          <!-- Status Check in -->
          <div id="checkInStatus" class="mx-auto my-8 flex items-center justify-center font-semibold">

          </div>

          <!--TABLE-->
          <table id="table-id" class="sortable mx-auto text-base table-fix w-full pt-2 px-2">
              <thead class="sticky -top-0.5">
              <tr>
                  <th class="bg-white">Nama</th>
                  <th class="bg-white">Id Participant</th>
                  <th class="bg-white">Action</th>
              </tr>
              </thead>
              <tbody id="customer" class="text-center text-sm"></tbody>
          </table>
        </section>
    `;
  },

  async afterRender() {

  
  $(document).ready(function() {
    const table = $('#table-id').DataTable( {
        "ajax": "http://lumintu-tiket.tamiaindah.xyz:8055/items/order?fields=customer_id.customer_id,customer_id.customer_email,customer_id.customer_name,ticket_id.ticket_id,ticket_id.ticket_type,ticket_id.ticket_x_session.session_id.,ticket_id.ticket_x_day.day_id.,invoice_id.invoice_status,invoice_id.customer_id.customer_email&filter[invoice_id][status]=settlement",
        "bInfo" : true,
        "columns": [
          { data: "customer_id.customer_name"},
          { data: "customer_id.customer_id"},
          { data: null }
        ],
        "pagingType":"simple_numbers",
        language: {
          sLengthMenu:"_MENU_",
          search: '', searchPlaceholder: "Participant name/id" ,
          oPaginate: {
              sNext: ' <button class="px-4 py-2 my-2 text-white bg-yellow-400 rounded-full hover:bg-gray-700 hover:text-black" > > <button class="sr-only ">(current)</button>',
              sPrevious: ' <button class="px-4 py-2 my-2 text-white bg-yellow-400 rounded-full hover:bg-gray-700 hover:text-black" > < <button class="sr-only ">(current)</button>',
        }
      },
      "columnDefs": [{
      "targets": -1,
      "data": null,
      "render": function(data, type, row, meta) {
          return `<a href="/#/participant-from-list/${data.customer_id.customer_id}"><button class='bg-yellow-400 hover:bg-gray-700 text-white font-bold px-3 py-1 md:py-2 md:px-4 rounded-full my-2'>Detail</button></a>`
      }
      }]
    });

    $('#table-id tbody').on( 'click', 'button', function () {
      const data = table.row( $(this).parents('tr') ).data();
    });
  });

  }
};

export default participantPage;

// `<a href="customer_id.customer_id"><button class='bg-blue-500 hover:bg-gray-700 text-white font-bold px-3 py-1 md:py-2 md:px-4 rounded-full my-2'>Detail</button></a>`
