<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <div class="row">
                            <label>
                                {{modalJob.created | age}} Days Old
                            </label>
                            <h3>
                                {{modalJob.jobNumber}}
                            </h3>
                        </div>
                        <div class="row">
                            <label class="col s4">
                                Model
                            </label>
                            <label class="col s4">
                                Make
                            </label>
                            <label class="col s4">
                                Customer Phone #
                            </label>
                            <h4 class="col s4">
                                {{modalJob.model}}
                            </h4>
                            <h4 class="col s4">
                                {{modalJob.make}}
                            </h4>
                            <h4 class="col s4">
                                {{modalJob.cellPhone}}
                            </h4>
                        </div>
                    </div>
                    <div class="modal-body row">
                        <label class="modal-body row">
                        Customer Notes
                    </label> {{modalJob.customerNotes}}
                    </div>
                    <div class="modal-body row">
                        <input type="text" placeholder="Mechanic Notes" v-model="modalJob.mechanicNotes" @blur="addMechNotes()" @keyup.tab="addMechNotes()">
                    </div>
                    <div v-if="partsRequired.length > 0" v-for="part in partsRequired">
                        <div class="modal-body row">
                            <div class="col s2">
                                <input type="text" v-model="part.partNumber" @blur="editPart( part )" placeholder="Part Number">
                            </div>
                            <div class="col s5">
                                <input type="text" v-model="part.partDescription" @blur="editPart( part )" placeholder="Part Description">
                            </div>
                            <div class="col s2">
                                <input type="number" v-model="part.partQty"  @blur="editPart( part )" placeholder="Qty">
                            </div>
                            <div class="col s2">
                                <input type="number" v-model="part.partPrice" @blur="editPart( part )" placeholder="$Price">
                            </div>
                            <div class="col s1">
                                <button v-on:click="archivePart(part)">-</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body row">
                        <div class="col s2">
                            <input type="text" v-model="partNumber" placeholder="Part Number">
                        </div>
                        <div class="col s5">
                            <input type="text" v-model="partDescription" placeholder="Part Description">
                        </div>
                        <div class="col s2">
                            <input type="number" v-model="partQty" placeholder="Qty">
                        </div>
                        <div class="col s2">
                            <input type="number" v-model="partPrice" placeholder="$Price">
                        </div>
                        <div class="col s1">
                            <button @click="addParts()">+</button>
                        </div>
                    </div>
                    <div class="modal-body row">
                        <button>Submit and Close</button>
                    </div>
                    <br>
                    <br>
                    <br>
                    <div class="row">
                        <label class="col s4">
                            Customer Name
                        </label>
                        <label class="col s4" v-if="activeCustomer.company">
                            Company Name
                        </label>
                        <label class="col s4">
                            Customer Email
                        </label>
                        <div class="col s4">
                            {{activeCustomer.name}}
                        </div>
                        <div class="col s4">
                            {{activeCustomer.company}}
                        </div>
                        <div class="col s4">
                            {{activeCustomer.email}}
                        </div>
                    </div>
                    <br>
                    <footer class="row">
                        <div class="col s12"></div>
                        <span @click="showModal()">Cancel</span>
                    </footer>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        data() {
            return {
                partDescription: '',
                partNumber: '',
                partQty: null,
                partPrice: null,
            }
        },
        mounted() {
            $(document).ready(function () {
                // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
                $('.modal').modal();
            });
        },
        filters: {
            age: function (createdInMs) {
                var now = Date.now()
                var ageInMs = now - createdInMs;
                var ageInDays = (ageInMs / (1000 * 60 * 60 * 24))
                return Math.floor(ageInDays);
            }
        },
        computed: {
            mechanicNotes() {
                return this.$root.store.state.modalJob.mechanicNotes
            },
            modalJob() {
                return this.$root.store.state.modalJob
            },
            activeCustomer() {
                return this.$root.store.state.activeCustomer
            },
            partsRequired() {
                return this.$root.store.state.parts.filter(part => {
                    return (part.jobId == this.$root.store.state.modalJob._id && part.archive == false)
                })
            },
        },
        methods: {
            showModal() {
                if (this.$parent.showModal) {
                    this.$parent.showModal = false
                } else {
                    this.$parent.showModal = true
                }
            },
            addMechNotes() {
                var object = {
                    mechanicNotes: this.mechanicNotes
                }
                console.log(object)
                this.$root.store.actions.changeJob(this.modalJob._id, object)
            },
            addParts() {
                var object = {
                    customerId: this.modalJob.customerId,
                    jobId: this.modalJob._id,
                    partDescription: this.partDescription,
                    partNumber: this.partNumber,
                    partQty: this.partQty,
                    partPrice: this.partPrice
                }
                this.$root.store.actions.postParts(object)
                this.partDescription = '',
                    this.partNumber = '',
                    this.partQty = '',
                    this.partPrice = ''
            },
            archivePart(part) {
                var id = part._id
                var object = {
                    archive: true
                }
                this.$root.store.actions.changePart(id, object)
            },
            editPart(part) {
                var id = part._id
                var object = {
                    partNumber: part.partNumber,
                    partDescription: part.partDescription,
                    partQty: part.partQty,
                    partPrice: part.partPrice
                }
                this.$root.store.actions.changePart(id, object)
            }
        }
    }

</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    
    .modal-container {
        width: 75%;
        margin: 0px auto;
        padding: 20px 30px;
        height: auto;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        max-height: calc(100vh - 30px);
        overflow-y: auto;
    }
    
    .modal-header h3 {
        margin-top: 0;
    }
    
    .modal-body.row {
        margin: 20px 0;
        text-align: center
    }
    
    .modal-default-button {
        float: right;
    }
    
    .modal-enter {
        opacity: 0;
    }
    
    .modal-leave-active {
        opacity: 0;
    }
    
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    
    slot {
        text-align: center
    }
    
    label {
        font-size: 10px;
    }
    
    footer {
        /*margin-top: 15%;
        position: relative;
        width: 100%;*/
        color: blue
    }
</style>