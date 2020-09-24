import Swal from "sweetalert2";

export default class SweetALert {
  static async sweetDelete(text="This item will be gone.") {
    try {
      let res = await Swal.fire({
        title: "Are you sure you want to delete this?",
        text: text,
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#DC3545",
        cancelButtonColor: "#28A745",
        confirmButtonText: "Yes, delete it!",
      });
      if (res.value) {
        return true;
      }
    } catch (error) {}
  }

  static toast(title= "You did a thing", timer = 3000){
    Swal.fire({
      title: title,
      icon: "success",
      timer: timer,
      toast: true,
      position: "top-right",
      showConfirmButton: false
    })
  }



}
