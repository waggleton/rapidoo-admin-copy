const ADMIN_BASE_URL = 'http://127.0.0.1:8000/v1/admin/';

export const SetProfileImage = async (profileImageDir: string, id: string): Promise<void> => {
    const response = await fetch(ADMIN_BASE_URL + "set_profile_image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            profile_image: profileImageDir,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Message:", data.message);
    } else {
        const errorData = await response.json();
        console.error("Error message:", errorData.message);
    }
};
