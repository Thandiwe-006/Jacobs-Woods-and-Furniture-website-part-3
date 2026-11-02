document.addEventListener("DOMContentLoaded", function ()
{
    const serviceSelect = document.getElementById("service");
    if (serviceSelect)
    {
        serviceSelect.addEventListener("change", function ()
        {
            const quoteDisplay = document.getElementById("quoteDisplay");
            const estimatedCost = document.getElementById("estimatedCost");
            const selectedValue = this.value;

            if (selectedValue && !isNaN(selectedValue))
            {
                quoteDisplay.style.display = "block";
                estimatedCost.innerText = parseFloat(selectedValue).toFixed(2);
            }
            else if (selectedValue === "volunteer" || selectedValue === "sponsor")
            {
                quoteDisplay.style.display = "block";
                estimatedCost.innerText = "0.00 (thank you for your interest)";
            }
            else
            {
                quoteDisplay.style.display = "none";
            }
        });
    }

    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm)
    {
        enquiryForm.addEventListener("submit", function (e)
        {
            e.preventDefault();

            if (!this.checkValidity())
            {
                this.reportValidity();
                return;
            }

            const formData = new FormData(this);
            const responseDiv = document.getElementById("formResponse");

            responseDiv.innerHTML = "<p style='color: blue;'>Processing your enquiry via AJAX...</p>";
            setTimeout(() =>
            {
                responseDiv.innerHTML = `<p style="color: green; font-weight: bold;">Success! Thank you, ${formData.get('name')}. Your enquiry regarding "${formData.get('service')}" has been processed.</p>`;

                this.reset();
                document.getElementById("quoteDisplay").style.display = "none";
            }, 1500);
        });
    }

    const contactForm = document.getElementById("contactForm");

    if (contactForm)
    {
        contactForm.addEventListener("submit", function (e)
        {
            e.preventDefault();

            if (!this.checkValidity())
            {
                this.reportValidity();
                return;
            }

            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const type = document.getElementById("messageType").value;
            const message = document.getElementById("contactMessage").value;

            const compiledText = `From: ${name} (${email})\nType: ${type}\nMessage: ${message}`;

            const previewDiv = document.getElementById("emailPreview");
            const previewText = document.getElementById("previewText");

            previewDiv.style.display = "block";
            previewText.innerHTML = `<strong>To:</strong> info@jacobswoodsandfurniture.com<br><strong>Subject:</strong> ${type} from ${name}<br><hr>${message}`;

            const mailtoLink = `mailto:info@jacobswoodsandfurniture.com?subject=${encodeURIComponent(type + " from " + name)}&body=${encodeURIComponent(compiledText)}`;

            alert("Email compiled successfully! Click OK to open your default email application.");

            window.location.href = mailtoLink;
        });
    }

    const images = document.querySelectorAll(".lightbox-img");
    if (images.length > 0)
    {
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";

        lightbox.style.cssText = "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; justify-content:center; align-items:center;";
        lightbox.innerHTML = '<span style="position:absolute; top:20px; right:30px; color:white; font-size:40px; cursor:pointer; font-weight:bold;" id="closeLightbox">&times;</span><img id="lightboxImg" style="max-width:90%; max-height:90%; border-radius: 5px;">';
        document.body.appendChild(lightbox);

        images.forEach(img =>
        {
            img.style.cursor = "pointer";
            img.addEventListener("click", function ()
            {
                lightbox.style.display = "flex";
                document.getElementById("lightboxImg").src = this.src;
            });
        });

        document.getElementById("closeLightbox").addEventListener("click", () =>
        {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener("click", (e) =>
        {
            if (e.target === lightbox) lightbox.style.display = "none";
        });
    }
});