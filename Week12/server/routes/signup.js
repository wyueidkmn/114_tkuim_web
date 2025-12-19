const data = req.user.role === 'admin'
  ? await findAll()
  : await findByOwner(req.user.id);
res.json({ total: data.length, data: data.map(serializeParticipant) });
