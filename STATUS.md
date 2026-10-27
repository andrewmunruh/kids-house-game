# M2 needs status
Done: model/server gate/net/UI pushed. tsc OK; tests/*.ts pass (art_raster's 2 FAILs also fail on 10ef736); needs_test 50/50 (old-client check included); hood 43/43; pets 46/46.
In progress (in /tmp/t-needs/gate, chain.sh -> chain2.sh -> chain3.sh): gameroom ranch map ambient_sync b0_compat phone, then needs_sync, then migration.
The migration crash was a preview-dist built with the wrong base; it's now rebuilt with VITE_BASE=/cozy-preview/.
needs_sync: the hint check was fixed in e1b27e9 and needs a rerun.
Left: gate results, PR #43 description, mark ready.
