import Swal from "sweetalert2";

export default class SweetALert {
  static async sweetDelete() {
    try {
      let res = await Swal.fire({
        title: "Are you sure?",
        // text: "They will be gone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "orange",
        confirmButtonText: "Yes, delete it!",
      });
      if (res.value) {
        return true;
      }
    } catch (error) {}
  }
}
