import { Modal, Space } from "antd"

const UpgradeModal = ({ upgradeVisible, upgradeOk, upgradeCancel }) => {
    return (
        <Modal
            title="Upgrade Account"
            visible={upgradeVisible}
            onOk={upgradeOk}
            onCancel={upgradeCancel}
            destroyOnClose
            style={{ top: 20, marginBottom: "100px" }}
        >
            <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
            ></Space>
            <div>
                Would you like to upgrade your account? Press "OK" to continue
                to the payment page.
            </div>
        </Modal>
    )
}

export default UpgradeModal
