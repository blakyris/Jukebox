<?php

namespace App\Controller\API\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Artist;

class ArtistController extends AbstractController
{
    /**
     * @Route("/api/library/artists", methods={"GET"})
     */
    public function getAll(DocumentManager $dm)
    {
        $response = new JsonResponse();

        try {
            $artists = $dm->getRepository(Artist::class)->findAll();

            $json = array();
            foreach ($artists as $artist)
                $json[] = $artist->getProperties();
    
            $response->setData($json);
            return $response;
        } catch (\Throwable $error) {
            $response->setStatusCode(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            $response->setData([
                'status' => "error",
                'code' => $error->getCode(),
                'message' => $error->getMessage()
            ]);
            return $response;
        }
    }

    /**
     * @Route("/api/library/artists/{id}", methods={"GET"})
     */
    public function getArtistById(DocumentManager $dm, $id)
    {
        $response = new JsonResponse();

        try {
            $artist = $dm->getRepository(Artist::class)->findOneBy(['id' => $id]);
            
            $response->setData($artist->getProperties());
            return $response;
        } catch (\Throwable $th) {
            $response->setStatusCode(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            $response->setData([
                'status' => "error",
                'code' => $error->getCode(),
                'message' => $error->getMessage()
            ]);
            return $response;
        }
    }
}
