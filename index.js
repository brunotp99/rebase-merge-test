export async function create (
    request : FastifyRequest, 
    reply : FastifyReply
) {
    
    const createSomethingBetter = z.object({
        gymId: z.string().uuid({message: "error"})
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    });
    
    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, semituide } = createCheckInBodySchema.parse(request.body)
    
    const checkInUseCase = makeCheckInUseCase();

    await checkInUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude, 
        userLongitude: semituide
    })
    
    return reply.statusCode(204).send()
     
}