import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@radix-ui/react-toast'
import axios from "axios";


export default function imprimir(
    ticket,
    barcode = "",
    imagePath = "logosapa.png",
    qr_url = "",
    vendor_id = localStorage.getItem("vendor_id"),
    product_id = localStorage.getItem("product_id")
) {
    return axios.post("http://localhost:3001/print-ticket", {
        data: ticket,
        vendor_id: vendor_id,
        product_id: product_id,
        barcode: barcode,
        imagePath: imagePath,
        qr_url: qr_url
    });
}
