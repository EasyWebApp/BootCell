import { observable } from 'mobx';
import { observer } from 'web-cell';

import { Button } from '../source/Form';
import {
    Drawer,
    DrawerHeader,
    DrawerTitle,
    DrawerBody
} from '../source/Layout';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter
} from '../source/Prompt';

const dialogState = observable({ drawer: false, modal: false });

export const DialogExamples = observer(() => (
    <>
        <Button className="me-2" onClick={() => (dialogState.drawer = true)}>
            Open drawer
        </Button>
        <Button onClick={() => (dialogState.modal = true)}>Open modal</Button>
        <Drawer
            show={dialogState.drawer}
            ariaLabelledby="test-drawer-title"
            onHide={() => (dialogState.drawer = false)}
        >
            <DrawerHeader closeButton>
                <DrawerTitle id="test-drawer-title">Example drawer</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
                <p>
                    This drawer follows the Bootstrap offcanvas layout and
                    closes from its close button, Escape, or backdrop.
                </p>
                <Button onClick={() => (dialogState.drawer = false)}>
                    Close drawer
                </Button>
            </DrawerBody>
        </Drawer>
        <Modal
            show={dialogState.modal}
            ariaLabelledby="test-modal-title"
            onHide={() => (dialogState.modal = false)}
        >
            <ModalHeader closeButton>
                <ModalTitle id="test-modal-title">Example modal</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <p>
                    This modal follows the Bootstrap dialog layout and closes
                    from its close button, Escape, or backdrop.
                </p>
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="outline"
                    theme="secondary"
                    data-bs-dismiss="modal"
                    onClick={() => (dialogState.modal = false)}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    </>
));
