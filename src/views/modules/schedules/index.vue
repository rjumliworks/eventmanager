<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">SCHEDULE</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Overview of the event schedule.</li>
            </ol>
        </div>
        <br/><br/>
        <template v-for="(venues, date) in groupedSchedule" :key="date">
            <div class="card border shadow-none bg-white-subtle w-100 card-height-100 mb-2 mt-2">
                <div class="card-body">
                    <div class="p-3 mt-n3 mx-n3 rounded-top bg-info-subtle">
                        <h5 class="mb-3 fs-10 fw-semibold text-center">{{ date }}</h5>
                    </div>

                    <template v-for="(sessions, venue) in venues" :key="venue">
                        <div class="table-responsive table-card mb-3">
                            <table class="table table-nowrap align-middle mb-0" style="table-layout: fixed; width: 100%;">
                                <thead class="table-light">
                                
                                    <tr class="fs-10">
                                        <th style="width: calc(100% - 80px);">{{venue}}</th>
                                        <th style="width: 110px;" class="text-center">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(l, index) in sessions" :key="index">
                                        <td class="fs-10" style="word-wrap: break-word; white-space: normal;">
                                        {{ l.title }}
                                        </td>
                                        <td class="text-center" style="font-size: 9px;">{{ l.start }} - {{ l.end }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </Layout>
</template>
<script>
import Layout from "@/layouts/main.vue";
export default {
    components: { Layout },
    data(){
        return {
            sessions: this.$store.state.data.sessions,
            participant_id: this.$store.state.auth.user.data.id,
            load: false
        }
    },
    computed: {
        groupedSchedule() {
            const formatDate = (dateStr) => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateStr).toLocaleDateString('en-US', options);
            };

            const formatTime = (timeStr) => {
            const [hours, minutes] = timeStr.split(':');
            const date = new Date();
            date.setHours(hours, minutes);
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            };

            const grouped = {};

            this.sessions.forEach(session => {
            if (!session.schedules || !session.schedules.length) return; // skip if no schedules
            const venueName = session.venue?.name || 'Unknown Venue';

            session.schedules.forEach(sched => {
                const date = sched.date;
                if (!grouped[date]) grouped[date] = {};
                if (!grouped[date][venueName]) grouped[date][venueName] = [];

                grouped[date][venueName].push({
                title: session.title,
                start: formatTime(sched.start_time),
                end: formatTime(sched.end_time)
                });
            });
            });

            // Sort sessions by start time
            for (let date in grouped) {
            for (let venue in grouped[date]) {
                grouped[date][venue].sort((a, b) => {
                const t1 = new Date(`1970-01-01T${a.start}`);
                const t2 = new Date(`1970-01-01T${b.start}`);
                return t1 - t2;
                });
            }
            }

            // Convert date keys to readable format
            const result = {};
            for (let date in grouped) {
            result[formatDate(date)] = grouped[date];
            }

            return result;
        }
    }
};
</script>