const JWT = process.env.REACT_APP_PINATA_JWT;

export const pinFileToIPFS = async (formData) => {
    try {
        const response = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${JWT}`
                },
                body: formData
            }
        );
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
